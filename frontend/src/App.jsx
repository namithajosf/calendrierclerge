import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendrierClergeLogin from "./components/CalendrierClergeLogin";
import Dashboard from "./pages/PublicDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<CalendrierClergeLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;