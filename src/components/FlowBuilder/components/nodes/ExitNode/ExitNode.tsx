import { NodeProps } from "reactflow";
import { BaseNode, BaseNodeData } from "../BaseNode";

export interface ExitNodeData extends BaseNodeData {
    profitCheck: boolean;
    lossCheck: boolean;
    timeExit: string;
}

export function ExitNode({ data, ...props }: NodeProps<ExitNodeData>) {
    const nodeConfig = {
        type: "exit",
        label: "Exit Conditions",
        borderColor: "border-red-500",
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
