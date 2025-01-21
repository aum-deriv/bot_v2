import { NodeProps } from "reactflow";
import { BaseNode, BaseNodeData } from "../BaseNode";

export interface PositionNodeData extends BaseNodeData {
    stake: number;
    profitTarget: number;
    stopLoss: number;
    maxTrades: number;
    takeProfit: number;
}

export function PositionNode({ data, ...props }: NodeProps<PositionNodeData>) {
    const nodeConfig = {
        type: "position",
        label: "Position Sizing",
        borderColor: "border-green-500",
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
