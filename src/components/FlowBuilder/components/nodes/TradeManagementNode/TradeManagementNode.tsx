import { NodeProps } from "reactflow";
import { BaseNode, BaseNodeData } from "../BaseNode";

export interface TradeManagementNodeData extends BaseNodeData {
    restartOnError: boolean;
    restartOnProfit: boolean;
    restartOnLoss: boolean;
    tradeAgainDelay: number;
}

export function TradeManagementNode({
    data,
    ...props
}: NodeProps<TradeManagementNodeData>) {
    const nodeConfig = {
        type: "tradeManagement",
        label: "Trade Management",
        borderColor: "border-pink-500",
    };

    return (
        <BaseNode
            {...props}
            data={data}
            type={nodeConfig.type}
            label={nodeConfig.label}
            className={nodeConfig.borderColor}
        />
    );
}
