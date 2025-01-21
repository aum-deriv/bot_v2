import EntryNode from "./EntryNode";
import PositionNode from "./PositionNode";
import ExitNode from "./ExitNode";
import PriceActionNode from "./PriceActionNode";
import ComparisonNode from "./ComparisonNode";
import RiskManagementNode from "./RiskManagementNode";
import TradeManagementNode from "./TradeManagementNode";
import VariableNode from "./VariableNode";
import LogicNode from "./LogicNode";

// Node Types Registry
export const nodeTypes = {
    entry: EntryNode,
    position: PositionNode,
    exit: ExitNode,
    priceAction: PriceActionNode,
    comparison: ComparisonNode,
    riskManagement: RiskManagementNode,
    tradeManagement: TradeManagementNode,
    variable: VariableNode,
    logic: LogicNode,
};

// Re-export all node types and their data interfaces
export * from "./EntryNode";
export * from "./PositionNode";
export * from "./ExitNode";
export * from "./PriceActionNode";
export * from "./ComparisonNode";
export * from "./RiskManagementNode";
export * from "./TradeManagementNode";
export * from "./VariableNode";
export * from "./LogicNode";
export * from "./BaseNode";
