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

type NodeData = {
    label: string;
    market?: string;
    tradeType?: string;
    stake?: number;
    profitTarget?: number;
    stopLoss?: number;
    profitCheck?: boolean;
    lossCheck?: boolean;
    timeExit?: string;
};

// Initial nodes representing our basic trading strategy components
const initialNodes: Node<NodeData>[] = [
    {
        id: "1",
        type: "input",
        data: {
            label: "Entry Conditions",
            market: "Derived",
            tradeType: "Up/Down",
        },
        position: { x: 250, y: 0 },
        className: "rounded-lg border-2 border-blue-500 bg-white",
    },
    {
        id: "2",
        data: {
            label: "Position Sizing",
            stake: 10,
            profitTarget: 100,
            stopLoss: 50,
        },
        position: { x: 250, y: 150 },
        className: "rounded-lg border-2 border-green-500 bg-white",
    },
    {
        id: "3",
        type: "output",
        data: {
            label: "Exit Conditions",
            profitCheck: true,
            lossCheck: true,
            timeExit: "5m",
        },
        position: { x: 250, y: 300 },
        className: "rounded-lg border-2 border-red-500 bg-white",
    },
];

// Initial edges connecting our nodes
const initialEdges: Edge[] = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
    },
    {
        id: "e2-3",
        source: "2",
        target: "3",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed },
    },
];

function App() {
    const [nodes, , onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (connection: Connection) =>
            setEdges((eds: Edge[]) => addEdge(connection, eds)),
        [setEdges]
    );

    return (
        <div className="w-screen h-screen bg-gray-100">
            <div className="p-4 h-full">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">
                    Trading Strategy Builder
                </h1>
                <div className="h-[800px] w-full bg-white rounded-lg shadow-lg">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                    >
                        <Background color="#aaa" gap={16} />
                        <Panel
                            position="top-right"
                            className="bg-white p-4 rounded shadow"
                        >
                            <h3 className="font-bold mb-2">Strategy Info</h3>
                            <p>Nodes: {nodes.length}</p>
                            <p>Connections: {edges.length}</p>
                        </Panel>
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
}

export default App;
