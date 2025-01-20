import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#242424] text-white">
            <div className="flex gap-8 mb-8">
                <a
                    href="https://vite.dev"
                    target="_blank"
                    className="hover:filter hover:drop-shadow-[0_0_2em_#646cffaa]"
                >
                    <img
                        src={viteLogo}
                        className="h-24 transition-all"
                        alt="Vite logo"
                    />
                </a>
                <a
                    href="https://react.dev"
                    target="_blank"
                    className="hover:filter hover:drop-shadow-[0_0_2em_#61dafbaa]"
                >
                    <img
                        src={reactLogo}
                        className="h-24 transition-all animate-[spin_20s_linear_infinite]"
                        alt="React logo"
                    />
                </a>
            </div>
            <h1 className="text-5xl font-bold mb-8">Vite + React</h1>
            <div className="text-center mb-8">
                <button
                    onClick={() => setCount((count) => count + 1)}
                    className="rounded-lg border border-transparent px-4 py-2 bg-[#1a1a1a] transition-colors hover:border-[#646cff] font-medium"
                >
                    count is {count}
                </button>
                <p className="mt-4">
                    Edit{" "}
                    <code className="font-mono bg-[#1a1a1a] rounded px-2">
                        src/App.tsx
                    </code>{" "}
                    and save to test HMR
                </p>
            </div>
            <p className="text-[#888]">
                Click on the Vite and React logos to learn more
            </p>
        </div>
    );
}

export default App;
