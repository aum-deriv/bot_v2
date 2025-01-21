import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { StrategyPanel } from "../components/StrategyPanel";
import { FlowBuilder } from "../components/FlowBuilder";

export default function AppContent() {
    return (
        <div className="h-[calc(100vh-40px)]">
            <PanelGroup direction="horizontal" className="h-full">
                <Panel defaultSize={25} minSize={20}>
                    <div className="h-full border-r border-gray-100 bg-white">
                        <div className="p-4 h-full">
                            <StrategyPanel />
                        </div>
                    </div>
                </Panel>
                <PanelResizeHandle className="group w-2 hover:w-3 bg-gray-100 hover:bg-gray-200 transition-all flex items-center justify-center relative cursor-col-resize">
                    <div className="w-0.5 h-8 bg-gray-300 group-hover:bg-gray-400 rounded-full transition-colors" />
                </PanelResizeHandle>
                <Panel minSize={30} defaultSize={75}>
                    <div className="h-full bg-white">
                        <div
                            className="h-full w-full"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 1px 1px, rgb(225, 225, 225) 1px, transparent 0)",
                                backgroundSize: "24px 24px",
                            }}
                        >
                            <FlowBuilder />
                        </div>
                    </div>
                </Panel>
            </PanelGroup>
        </div>
    );
}
