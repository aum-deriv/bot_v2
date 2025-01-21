import { useState, useEffect } from "react";
import { useAPI } from "../../context";
import type { WebSocketResponse } from "../../websocket";

interface UseQueryResult<T = WebSocketResponse> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useQuery<T = WebSocketResponse>(
    request: Record<string, unknown>
): UseQueryResult<T> {
    const { ws } = useAPI();
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const executeQuery = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await ws.send(request);
            setData(response as T);
        } catch (err) {
            setError(err instanceof Error ? err : new Error("Query failed"));
        } finally {
            setIsLoading(false);
        }
    };

    // Execute query once on mount
    useEffect(() => {
        executeQuery();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty deps = only run on mount

    return {
        data,
        isLoading,
        error,
        refetch: executeQuery,
    };
}
