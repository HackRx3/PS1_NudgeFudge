import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
