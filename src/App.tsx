// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateAd from "./pages/CreateAd";
import AuthPage from "./pages/AuthPage";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/create" element={<CreateAd />} />
    </Routes>
  );
}

export default App;
