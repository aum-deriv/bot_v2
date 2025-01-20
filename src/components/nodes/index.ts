import { BaseNode, BaseNodeData } from "./BaseNode";

// Entry Node Types
export interface EntryNodeData extends BaseNodeData {
    market: string;
    tradeType: string;
    timeframe: string;
    buyOrSell: "buy" | "sell";
}

// Position Node Types
export interface PositionNodeData extends BaseNodeData {
    stake: number;
    profitTarget: number;
    stopLoss: number;
    maxTrades: number;
    takeProfit: number;
}

// Exit Node Types
export interface ExitNodeData extends BaseNodeData {
    profitCheck: boolean;
    lossCheck: boolean;
    timeExit: string;
}

// Price Action Node Types
export interface PriceActionNodeData extends BaseNodeData {
    currentTick: number;
    previousTick: number;
    tickCount: number;
}

// Technical Analysis Node Types
export interface TechnicalNodeData extends BaseNodeData {
    indicator: string;
    period: number;
    value: number;
}

// Value Comparison Node Types
export interface ComparisonNodeData extends BaseNodeData {
    operator: ">" | "<" | "==" | ">=" | "<=";
    value: number;
}

// Risk Management Node Types
export interface RiskManagementNodeData extends BaseNodeData {
    positionSizingRule: string;
    maxTradesPerDay: number;
    maxConsecutiveLosses: number;
    maxDrawdown: number;
}

// Trade Management Node Types
export interface TradeManagementNodeData extends BaseNodeData {
    restartOnError: boolean;
    restartOnProfit: boolean;
    restartOnLoss: boolean;
    tradeAgainDelay: number;
}

// Variable Node Types
export interface VariableNodeData extends BaseNodeData {
    variableName: string;
    value: number | string | boolean;
    type: "number" | "string" | "boolean";
}

// Logic Node Types
export interface LogicNodeData extends BaseNodeData {
    operationType: "AND" | "OR" | "IF" | "THEN";
    conditions: string[];
}

// Node Colors
export const nodeColors = {
    entry: "border-blue-500",
    position: "border-green-500",
    exit: "border-red-500",
    priceAction: "border-cyan-500",
    technical: "border-purple-500",
    comparison: "border-yellow-500",
    riskManagement: "border-orange-500",
    tradeManagement: "border-pink-500",
    variable: "border-indigo-500",
    logic: "border-teal-500",
};

// Node Types Registry
export const nodeTypes = {
    entry: BaseNode,
    position: BaseNode,
    exit: BaseNode,
    priceAction: BaseNode,
    technical: BaseNode,
    comparison: BaseNode,
    riskManagement: BaseNode,
    tradeManagement: BaseNode,
    variable: BaseNode,
    logic: BaseNode,
};

// Export all node types
export { BaseNode };
