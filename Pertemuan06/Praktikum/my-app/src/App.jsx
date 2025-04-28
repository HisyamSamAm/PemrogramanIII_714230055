import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LayoutDashboard } from "./components/layouts/LayoutDashboard";
import { HomePage } from "./pages/HomePage";
import { MahasiswaPage } from "./pages/MahasiswaPage";
// import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
    return (
        <Router>
            <LayoutDashboard>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/mahasiswa" element={<MahasiswaPage />} />
                    {/*<Route path="/settings" element={<SettingsPage />} />*/}
                </Routes>
            </LayoutDashboard>
        </Router>
    );
}