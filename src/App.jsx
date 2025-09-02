import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MerchantCheckin from "./pages/MerchantCheckin";
import PracticeMode from "./pages/PracticeMode";
import SupervisorDashboard from "./pages/SupervisorDashboard";

function App() {

    <div>
      <Navbar />

    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/merchant" element={<MerchantCheckin />} />
      <Route path="/practice" element={<PracticeMode />} />
      <Route path="/dashboard" element={<SupervisorDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
