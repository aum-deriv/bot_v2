export interface WebSocketRequest {
    req_id?: number;
    [key: string]: unknown;
}

export interface WebSocketResponse {
    req_id?: number;
    msg_type?: string;
    error?: {
        code: string;
        message: string;
    };
    subscription?: {
        id?: string;
    };
    [key: string]: unknown;
}

export type MessageCallback = (response: WebSocketResponse) => void;

interface PendingRequest {
    resolve: (value: WebSocketResponse) => void;
    reject: (error: Error) => void;
    isSubscription: boolean;
    callback?: MessageCallback;
    subscriptionId?: string;
}

class WebSocketClient {
    private static instance: WebSocketClient | null = null;
    private ws: WebSocket | null = null;
    private readonly url = "wss://ws.derivws.com/websockets/v3?app_id=1";
    private reconnectAttempts = 0;
    private readonly maxReconnectAttempts = 5;
    private reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
    private reqId = 1;
    private pendingRequests = new Map<number, PendingRequest>();
    private connectionPromise: Promise<void>;
    private connectionResolve: (() => void) | null = null;
    private connectionReject: ((error: Error) => void) | null = null;

    private constructor() {
        // Initialize connection promise in constructor
        this.connectionPromise = new Promise((resolve, reject) => {
            this.connectionResolve = resolve;
            this.connectionReject = reject;
        });

        // Initiate the single connection
        this.initConnection();
    }

    public static getInstance(): WebSocketClient {
        if (!WebSocketClient.instance) {
            WebSocketClient.instance = new WebSocketClient();
        }
        return WebSocketClient.instance;
    }

    private initConnection(): void {
        try {
            this.ws = new WebSocket(this.url);
            this.setupEventListeners();
        } catch (error) {
            console.error("WebSocket connection error:", error);
            if (this.connectionReject) {
                this.connectionReject(
                    error instanceof Error ? error : new Error(String(error))
                );
            }
            this.handleReconnect();
        }
    }

    private setupEventListeners(): void {
        if (!this.ws) return;

        this.ws.onopen = () => {
            console.log("WebSocket connected");
            this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
            if (this.connectionResolve) {
                this.connectionResolve();
            }
        };

        this.ws.onclose = (event) => {
            console.log(
                "WebSocket connection closed:",
                event.code,
                event.reason
            );
            // Create new connection promise for reconnection
            this.connectionPromise = new Promise((resolve, reject) => {
                this.connectionResolve = resolve;
                this.connectionReject = reject;
            });
            this.handleReconnect();
        };

        this.ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        this.ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                this.handleMessage(data);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };
    }

    private handleReconnect(): void {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error("Max reconnection attempts reached");
            if (this.connectionReject) {
                this.connectionReject(
                    new Error("Max reconnection attempts reached")
                );
            }
            return;
        }

        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }

        this.reconnectTimeout = setTimeout(() => {
            this.reconnectAttempts++;
            console.log(
                `Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
            );
            this.initConnection();
        }, Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000)); // Exponential backoff with max 30s
    }

    private handleMessage(data: WebSocketResponse): void {
        console.log("Received message:", data);

        const reqId = data.req_id;
        if (!reqId || !this.pendingRequests.has(reqId)) {
            return;
        }

        const request = this.pendingRequests.get(reqId);
        if (!request) {
            return;
        }

        if (data.error) {
            console.error(
                "WebSocket API error:",
                data.error.code,
                data.error.message
            );
            request.reject(new Error(data.error.message));
            if (!request.isSubscription && reqId) {
                this.pendingRequests.delete(reqId);
            }
            return;
        }

        // Store subscription ID if provided
        if (request.isSubscription && data.subscription?.id) {
            request.subscriptionId = data.subscription.id;
        }

        // For subscriptions, call the callback and keep the request
        if (request.isSubscription && request.callback) {
            request.callback(data);
            request.resolve(data);
        }
        // For one-time calls, resolve and remove the request
        else {
            request.resolve(data);
            if (reqId) {
                this.pendingRequests.delete(reqId);
            }
        }
    }

    public async send(message: WebSocketRequest): Promise<WebSocketResponse> {
        // Wait for connection to be established
        await this.connectionPromise;

        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error("WebSocket is not connected");
        }

        const ws = this.ws;

        return new Promise((resolve, reject) => {
            try {
                // Add request ID if not provided
                if (!message.req_id) {
                    message.req_id = this.reqId++;
                }

                // Store the pending request
                this.pendingRequests.set(message.req_id, {
                    resolve,
                    reject,
                    isSubscription: false,
                });

                ws.send(JSON.stringify(message));
            } catch (error) {
                console.error("Error sending message:", error);
                reject(error);
                // Clean up pending request on error
                if (message.req_id) {
                    this.pendingRequests.delete(message.req_id);
                }
            }
        });
    }

    public async subscribe(
        request: WebSocketRequest,
        callback: MessageCallback
    ): Promise<number> {
        // Wait for connection to be established
        await this.connectionPromise;

        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            throw new Error("WebSocket is not connected");
        }

        const ws = this.ws;

        return new Promise((resolve, reject) => {
            try {
                // Add request ID if not provided
                if (!request.req_id) {
                    request.req_id = this.reqId++;
                }

                const reqId = request.req_id;

                // Store the subscription request
                this.pendingRequests.set(reqId, {
                    // This resolve/reject is for the initial subscription response
                    resolve: () => resolve(reqId),
                    reject,
                    isSubscription: true,
                    callback,
                });

                ws.send(JSON.stringify(request));
            } catch (error) {
                console.error("Error sending subscription:", error);
                reject(error);
                // Clean up pending request on error
                if (request.req_id) {
                    this.pendingRequests.delete(request.req_id);
                }
            }
        });
    }

    public unsubscribe(reqId: number): void {
        const request = this.pendingRequests.get(reqId);
        if (!request?.isSubscription) {
            console.warn(`No subscription found for req_id: ${reqId}`);
            return;
        }

        // If we have a subscription ID, send forget request
        if (request.subscriptionId) {
            this.send({
                forget: request.subscriptionId,
            });
        }

        // Remove subscription
        this.pendingRequests.delete(reqId);
    }

    public unsubscribeAll(): void {
        // Send forget_all request
        this.send({
            forget_all: "all",
        });

        // Clear all subscriptions
        for (const [reqId, request] of this.pendingRequests) {
            if (request.isSubscription) {
                this.pendingRequests.delete(reqId);
            }
        }
    }

    public close(): void {
        // Unsubscribe from all subscriptions
        this.unsubscribeAll();

        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
            this.reconnectTimeout = null;
        }
        WebSocketClient.instance = null;
    }

    public isConnected(): boolean {
        return this.ws?.readyState === WebSocket.OPEN;
    }
}

export default WebSocketClient;
