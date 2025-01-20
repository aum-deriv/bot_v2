import { useCallback } from "react";
import ReactFlow, {
    Node,
    Edge,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    MarkerType,
    Background,
    Panel,
} from "reactflow";
import "reactflow/dist/style.css";
import {
    nodeTypes,
    nodeColors,
    EntryNodeData,
    PositionNodeData,
    ExitNodeData,
    ComparisonNodeData,
    PriceActionNodeData,
    RiskManagementNodeData,
    TradeManagementNodeData,
    VariableNodeData,
    LogicNodeData,
} from "./nodes";

type NodeTypes =
    | EntryNodeData
    | PositionNodeData
    | ExitNodeData
    | ComparisonNodeData
    | PriceActionNodeData
    | RiskManagementNodeData
    | TradeManagementNodeData
    | VariableNodeData
    | LogicNodeData;

// Initial nodes representing our basic trading strategy components
const initialNodes: Node<NodeTypes>[] = [
    {
        id: "entry1",
        type: "entry",
        data: {
            label: "Entry Conditions",
            market: "Derived",
            tradeType: "Up/Down",
            timeframe: "5m",
            buyOrSell: "buy",
        } as EntryNodeData,
        position: { x: 180, y: 20 },
        className: `rounded-sm border-[1px] ${nodeColors.entry}`,
    },
    {
        id: "priceAction1",
        type: "priceAction",
        data: {
            label: "Price Analysis",
            currentTick: 1.2345,
            previousTick: 1.234,
            tickCount: 5,
        } as PriceActionNodeData,
        position: { x: 100, y: 80 },
        className: `rounded-sm border-[1px] ${nodeColors.priceAction}`,
    },
    {
        id: "comparison1",
        type: "comparison",
        data: {
            label: "Price Comparison",
            operator: ">",
            value: 1.234,
        } as ComparisonNodeData,
        position: { x: 180, y: 80 },
        className: `rounded-sm border-[1px] ${nodeColors.comparison}`,
    },
    {
        id: "variable1",
        type: "variable",
        data: {
            label: "Store Value",
            variableName: "lastPrice",
            value: 1.2345,
            type: "number",
        } as VariableNodeData,
        position: { x: 260, y: 80 },
        className: `rounded-sm border-[1px] ${nodeColors.variable}`,
    },
    {
        id: "logic1",
        type: "logic",
        data: {
            label: "Entry Logic",
            operationType: "AND",
            conditions: ["Price > Previous", "In Trading Hours"],
        } as LogicNodeData,
        position: { x: 180, y: 140 },
        className: `rounded-sm border-[1px] ${nodeColors.logic}`,
    },
    {
        id: "position1",
        type: "position",
        data: {
            label: "Position Sizing",
            stake: 10,
            profitTarget: 100,
            stopLoss: 50,
            maxTrades: 5,
            takeProfit: 150,
        } as PositionNodeData,
        position: { x: 140, y: 200 },
        className: `rounded-sm border-[1px] ${nodeColors.position}`,
    },
    {
        id: "riskManagement1",
        type: "riskManagement",
        data: {
            label: "Risk Management",
            positionSizingRule: "2% per trade",
            maxTradesPerDay: 5,
            maxConsecutiveLosses: 3,
            maxDrawdown: 20,
        } as RiskManagementNodeData,
        position: { x: 220, y: 200 },
        className: `rounded-sm border-[1px] ${nodeColors.riskManagement}`,
    },
    {
        id: "exit1",
        type: "exit",
        data: {
            label: "Exit Conditions",
            profitCheck: true,
            lossCheck: true,
            timeExit: "5m",
        } as ExitNodeData,
        position: { x: 140, y: 260 },
        className: `rounded-sm border-[1px] ${nodeColors.exit}`,
    },
    {
        id: "tradeManagement1",
        type: "tradeManagement",
        data: {
            label: "Trade Management",
            restartOnError: true,
            restartOnProfit: true,
            restartOnLoss: false,
            tradeAgainDelay: 60,
        } as TradeManagementNodeData,
        position: { x: 220, y: 260 },
        className: `rounded-sm border-[1px] ${nodeColors.tradeManagement}`,
    },
];

// Initial edges connecting our nodes
const initialEdges: Edge[] = [
    {
        id: "e-entry1-priceAction1",
        source: "entry1",
        target: "priceAction1",
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e-entry1-comparison1",
        source: "entry1",
        target: "comparison1",
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e-entry1-variable1",
        source: "entry1",
        target: "variable1",
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e-priceAction1-logic1",
        source: "priceAction1",
        target: "logic1",
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e-comparison1-logic1",
        source: "comparison1",
        target: "logic1",
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e-variable1-logic1",
        source: "variable1",
        target: "logic1",
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e-logic1-position1",
        source: "logic1",
        target: "position1",
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e-riskManagement1-position1",
        source: "riskManagement1",
        target: "position1",
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e-position1-exit1",
        source: "position1",
        target: "exit1",
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e-tradeManagement1-exit1",
        source: "tradeManagement1",
        target: "exit1",
        markerEnd: { type: MarkerType.ArrowClosed },
    },
];

export function StrategyFlow() {
    const [nodes, , onNodesChange] = useNodesState<NodeTypes>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (connection: Connection) =>
            setEdges((eds: Edge[]) => addEdge(connection, eds)),
        [setEdges]
    );

    return (
        <div className="h-full">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
                minZoom={0.5}
                maxZoom={1.5}
            >
                <Panel
                    position="top-right"
                    className="bg-white px-2 py-1.5 rounded border border-gray-100 shadow-sm text-[10px]"
                >
                    <h3 className="text-xs font-semibold text-gray-600 mb-1.5">
                        Strategy Info
                    </h3>
                    <div className="text-gray-500 space-y-0.5">
                        <p>Nodes: {nodes.length}</p>
                        <p>Connections: {edges.length}</p>
                    </div>
                </Panel>
            </ReactFlow>
        </div>
    );
}
