import { Handle, Position, NodeProps } from "reactflow";

export interface BaseNodeData {
    label: string;
    [key: string]: string | number | boolean | string[] | undefined;
}

export function BaseNode({ data, isConnectable }: NodeProps<BaseNodeData>) {
    return (
        <div className="px-1 py-0.5 shadow-sm rounded-sm bg-white border-[1px] text-[10px] max-w-[110px]">
            <div className="flex-1">
                <div className="font-medium text-[9px] leading-none mb-0.5">
                    {data.label}
                </div>
                <div className="text-[8px] text-gray-500 leading-none">
                    {Object.entries(data)
                        .filter(([key]) => key !== "label")
                        .map(([key, value]) => (
                            <div
                                key={key}
                                className="flex items-center gap-0.5 leading-tight mb-[1px]"
                            >
                                <span className="capitalize whitespace-nowrap min-w-0 shrink-0 opacity-75">
                                    {key.replace(/([A-Z])/g, " $1").trim()}:
                                </span>
                                <span className="truncate min-w-0 flex-1">
                                    {Array.isArray(value)
                                        ? value.join(", ")
                                        : typeof value === "boolean"
                                        ? value
                                            ? "Y"
                                            : "N"
                                        : value}
                                </span>
                            </div>
                        ))}
                </div>
            </div>
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
                className="w-1 h-1"
            />
            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                className="w-1 h-1"
            />
        </div>
    );
}
