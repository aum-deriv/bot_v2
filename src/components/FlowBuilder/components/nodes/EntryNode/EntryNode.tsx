import { NodeProps } from "reactflow";
import { BaseNode, BaseNodeData } from "../BaseNode";

export interface EntryNodeData extends BaseNodeData {
    market: string;
    tradeType: string;
    timeframe: string;
    buyOrSell: "buy" | "sell";
}

export function EntryNode({ data, ...props }: NodeProps<EntryNodeData>) {
    const nodeConfig = {
        type: "entry",
        label: "Entry Conditions",
        borderColor: "border-blue-500",
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
