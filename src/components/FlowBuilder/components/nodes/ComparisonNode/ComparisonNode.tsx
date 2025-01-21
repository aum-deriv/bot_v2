import { NodeProps } from "reactflow";
import { BaseNode, BaseNodeData } from "../BaseNode";

export interface ComparisonNodeData extends BaseNodeData {
    operator: ">" | "<" | "==" | ">=" | "<=";
    value: number;
}

export function ComparisonNode({
    data,
    ...props
}: NodeProps<ComparisonNodeData>) {
    const nodeConfig = {
        type: "comparison",
        label: "Price Comparison",
        borderColor: "border-yellow-500",
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
