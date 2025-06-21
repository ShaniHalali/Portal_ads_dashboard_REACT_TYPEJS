// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateAd from "./pages/CreateAd";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/create" element={<CreateAd />} />
    </Routes>
  );
}

export default App;
