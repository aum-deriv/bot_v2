import { StrategyFlow } from "./components/StrategyFlow";
import { StrategyConfig } from "./components/StrategyConfig";
import { BrandDerivLogoCoralIcon } from "@deriv/quill-icons";

function App() {
    return (
        <div className="w-screen h-screen bg-gray-100">
            <div className="p-4 h-full">
                <h1 className="text-2xl flex items-center gap-2 font-bold mb-4 text-red-500">
                    <BrandDerivLogoCoralIcon height="40px" width="40px" />{" "}
                    <span>bots_v2</span>
                </h1>
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <StrategyConfig />
                    </div>
                    <div className="w-1/2">
                        <StrategyFlow />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
