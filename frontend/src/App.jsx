import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import UserService from "./services/UserService.js";
import { useEffect, useState } from "react";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import ChangePasswordPage from "./pages/ChangePassword/ChangePasswordPage.jsx";
import axios from "axios";
import FlightsPage from "./pages/Flights/FlightsPage.jsx";

function App() {
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          alert("Login Session Expired");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* Public page */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/flights" element={<FlightsPage />} />

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
