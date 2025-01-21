import { NodeProps } from "reactflow";
import { BaseNode, BaseNodeData } from "../BaseNode";

export interface RiskManagementNodeData extends BaseNodeData {
    positionSizingRule: string;
    maxTradesPerDay: number;
    maxConsecutiveLosses: number;
    maxDrawdown: number;
}

export function RiskManagementNode({
    data,
    ...props
}: NodeProps<RiskManagementNodeData>) {
    const nodeConfig = {
        type: "riskManagement",
        label: "Risk Management",
        borderColor: "border-orange-500",
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
