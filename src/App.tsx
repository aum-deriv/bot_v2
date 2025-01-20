import { StrategyFlow } from "./components/StrategyFlow";
import { StrategyConfig } from "./components/StrategyConfig";
import { BrandDerivLogoCoralIcon } from "@deriv/quill-icons";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

function App() {
    return (
        <div className="w-screen h-screen bg-white">
            <div className="h-10 px-4 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2.5">
                    <BrandDerivLogoCoralIcon height="20px" width="20px" />
                    <span className="text-sm font-medium text-gray-800">
                        bots_v2
                    </span>
                </div>
                <div className="flex items-center gap-8 text-xs text-gray-500">
                    <span className="hover:text-gray-800 transition-colors">
                        My Projects
                    </span>
                    <span className="hover:text-gray-800 transition-colors">
                        Design to Code
                    </span>
                    <span className="text-red-500">Saved</span>
                </div>
            </div>
            <div className="h-[calc(100vh-40px)]">
                <PanelGroup direction="horizontal" className="h-full">
                    <Panel defaultSize={25} minSize={20}>
                        <div className="h-full border-r border-gray-100 bg-white">
                            <div className="p-4 h-full">
                                <StrategyConfig />
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
                                <StrategyFlow />
                            </div>
                        </div>
                    </Panel>
                </PanelGroup>
            </div>
        </div>
    );
}

export default App;
