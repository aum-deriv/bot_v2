import { Header } from "./components/Header";
import { AppContent } from "./AppContent";
import { APIProvider } from "./api";

function App() {
    return (
        <APIProvider>
            <div className="w-screen h-screen bg-white">
                <Header />
                <AppContent />
            </div>
        </APIProvider>
    );
}

export default App;
