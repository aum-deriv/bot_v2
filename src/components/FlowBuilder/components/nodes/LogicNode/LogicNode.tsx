import { NodeProps } from "reactflow";
import { BaseNode, BaseNodeData } from "../BaseNode";

export interface LogicNodeData extends BaseNodeData {
    operationType: "AND" | "OR" | "IF" | "THEN";
    conditions: string[];
}

export function LogicNode({ data, ...props }: NodeProps<LogicNodeData>) {
    const nodeConfig = {
        type: "logic",
        label: "Entry Logic",
        borderColor: "border-teal-500",
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
