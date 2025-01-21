import { NodeProps } from "reactflow";
import { BaseNode, BaseNodeData, NodeConfig } from "../BaseNode";

export interface PriceActionNodeData extends BaseNodeData {
    currentTick: number;
    previousTick: number;
    tickCount: number;
}

export function PriceActionNode(props: NodeProps<PriceActionNodeData>) {
    const nodeConfig: NodeConfig<PriceActionNodeData> = {
        type: "priceAction",
        data: {
            label: "Price Analysis",
            currentTick: 1.2345,
            previousTick: 1.234,
            tickCount: 5,
        },
        borderColor: "border-cyan-500",
    };

    return (
        <BaseNode
            {...props}
            type={nodeConfig.type}
            className={nodeConfig.borderColor}
        />
    );
}
