import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import LandingPage from "./LandingPage";
import ChatPage from "./ChatPage";

function App() {
  return (
    <Router>
      <div className="App selection:bg-blue-500/30">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
