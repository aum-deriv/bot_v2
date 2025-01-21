import { NodeProps } from "reactflow";
import { BaseNode, BaseNodeData } from "../BaseNode";

export interface VariableNodeData extends BaseNodeData {
    variableName: string;
    value: number | string | boolean;
    type: "number" | "string" | "boolean";
}

export function VariableNode({ data, ...props }: NodeProps<VariableNodeData>) {
    const nodeConfig = {
        type: "variable",
        label: "Store Value",
        borderColor: "border-indigo-500",
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
