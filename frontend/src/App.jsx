import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import UserService from "./services/UserService.js";
import { useEffect, useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {UserService.isAuthenticated() && <Navbar />}
        <div className="content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
