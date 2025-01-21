import { useState } from "react";
import { useAPI } from "../../context";
import type { WebSocketResponse } from "../../websocket";

interface UseMutationResult<T = WebSocketResponse> {
    mutate: (request: Record<string, unknown>) => Promise<T>;
    data: T | null;
    isLoading: boolean;
    error: Error | null;
    reset: () => void;
}

export function useMutation<T = WebSocketResponse>(): UseMutationResult<T> {
    const { ws } = useAPI();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const mutate = async (request: Record<string, unknown>): Promise<T> => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await ws.send(request);
            const result = response as T;
            setData(result);
            return result;
        } catch (err) {
            const error =
                err instanceof Error ? err : new Error("Mutation failed");
            setError(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
        setIsLoading(false);
    };

    return {
        mutate,
        data,
        isLoading,
        error,
        reset,
    };
}
