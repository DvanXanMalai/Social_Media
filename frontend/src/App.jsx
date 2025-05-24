import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
