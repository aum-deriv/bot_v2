import { useState, useEffect, useCallback, useRef } from "react";
import { useAPI } from "../../context";
import type { WebSocketResponse } from "../../websocket";

interface UseSubscriptionOptions {
    enabled?: boolean;
}

interface UseSubscriptionResult<T = WebSocketResponse> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
    isSubscribed: boolean;
    subscribe: () => Promise<void>;
    unsubscribe: () => void;
}

export function useSubscription<T = WebSocketResponse>(
    request: Record<string, unknown>,
    { enabled = true }: UseSubscriptionOptions = {}
): UseSubscriptionResult<T> {
    const { ws } = useAPI();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const reqIdRef = useRef<number | null>(null);
    const requestRef = useRef(request);

    // Update the request ref when it changes
    useEffect(() => {
        requestRef.current = request;
    }, [request]);

    // Function to unsubscribe
    const unsubscribe = useCallback(() => {
        if (reqIdRef.current !== null) {
            ws.unsubscribe(reqIdRef.current);
            reqIdRef.current = null;
            setIsSubscribed(false);
            setData(null);
            setError(null);
        }
    }, [ws]);

    // Function to subscribe
    const subscribe = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Unsubscribe from any existing subscription first
            unsubscribe();

            const handleUpdate = (response: WebSocketResponse) => {
                setData(response as T);
            };

            const id = await ws.subscribe(requestRef.current, handleUpdate);
            reqIdRef.current = id;
            setIsSubscribed(true);
        } catch (err) {
            setError(
                err instanceof Error ? err : new Error("Subscription failed")
            );
        } finally {
            setIsLoading(false);
        }
    }, [ws, unsubscribe]);

    // Handle subscription lifecycle
    useEffect(() => {
        if (enabled) {
            subscribe();
        } else {
            unsubscribe();
        }
        return () => {
            unsubscribe();
        };
    }, [enabled, subscribe, unsubscribe]);

    return {
        data,
        isLoading,
        error,
        isSubscribed,
        subscribe,
        unsubscribe,
    };
}
