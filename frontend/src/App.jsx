import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import UserService from "./services/UserService.js";
import { useEffect, useState } from "react";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import ChangePasswordPage from "./pages/ChangePassword/ChangePasswordPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Public page */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />

          {/* User page */}
          <Route path="/user/profile" element={<UserProfile />} />
          <Route
            path="/user/change-password"
            element={<ChangePasswordPage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
