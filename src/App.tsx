import { NavBar } from "./components/NavBar";
import { AppContent } from "./components/AppContent";

function App() {
    return (
        <div className="w-screen h-screen bg-white">
            <NavBar />
            <AppContent />
        </div>
    );
}

export default App;
