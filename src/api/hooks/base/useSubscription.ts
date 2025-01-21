import { useState, useEffect, useCallback } from "react";
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
    const [reqId, setReqId] = useState<number | null>(null);

    // Callback to handle subscription updates
    const handleUpdate = useCallback((response: WebSocketResponse) => {
        setData(response as T);
    }, []);

    // Function to unsubscribe
    const unsubscribe = useCallback(() => {
        if (reqId !== null) {
            ws.unsubscribe(reqId);
            setReqId(null);
            setIsSubscribed(false);
            setData(null);
            setError(null);
        }
    }, [reqId, ws]);

    // Function to subscribe
    const subscribe = useCallback(async () => {
        // Unsubscribe from any existing subscription first
        unsubscribe();

        setIsLoading(true);
        setError(null);
        try {
            const id = await ws.subscribe(request, handleUpdate);
            setReqId(id);
            setIsSubscribed(true);
        } catch (err) {
            setError(
                err instanceof Error ? err : new Error("Subscription failed")
            );
        } finally {
            setIsLoading(false);
        }
    }, [request, ws, handleUpdate, unsubscribe]);

    // Handle subscription lifecycle
    useEffect(() => {
        if (enabled) {
            subscribe();
        } else {
            unsubscribe();
        }
        return unsubscribe;
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
