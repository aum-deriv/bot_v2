import { createContext, useContext, ReactNode } from "react";
import WebSocketClient from "../websocket";

interface APIContextValue {
    ws: WebSocketClient;
}

const APIContext = createContext<APIContextValue | null>(null);

interface APIProviderProps {
    children: ReactNode;
}

export default function APIProvider({ children }: APIProviderProps) {
    // Initialize the singleton instance
    const ws = WebSocketClient.getInstance();

    return <APIContext.Provider value={{ ws }}>{children}</APIContext.Provider>;
}

export function useAPI() {
    const context = useContext(APIContext);
    if (!context) {
        throw new Error("useAPI must be used within an APIProvider");
    }
    return context;
}
