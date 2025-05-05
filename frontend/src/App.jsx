import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import Navbar from "./components/Navbar.jsx";
import UserService from "./services/UserService.js";
import { useEffect, useState } from "react";
import ChangePasswordPage from "./pages/ChangePassword/ChangePasswordPage.jsx";
import axios from "axios";
import FlightsPage from "./pages/Flights/FlightsPage.jsx";
import FlightManagementPage from "./pages/FlightsManagement/FlightManagementPage.jsx";
import UserProfilePage from "./pages/UserProfile/UserProfile.jsx";
import AdminFlightDetail from "./pages/AdminFlightDetail/AdminFlightDetail.jsx";

function App() {
  const handleRefreshToken = () => {
    if (UserService.isAuthenticated()) {
      if (UserService.isTokenAlmostExpire()) {
        const token = localStorage.getItem("token");
        const response = UserService.refreshToken(token);
        if (response.statusCode === 200) {
          localStorage.setItem("token", response.token);
        }
      }
    }
  };

  const handleTokenExpired = () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      if (UserService.isTokenExpired(token)) {
        UserService.logout();
        alert("Login Session Expired");
        window.location.href = "/login";
      }
    }
  };

  useEffect(() => {
    handleTokenExpired();
    handleRefreshToken();
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

          {/* Authentication page */}
          {UserService.isAuthenticated() && (
            <>
              <Route path="/user/profile" element={<UserProfilePage />} />{" "}
              <Route
                path="/user/change-password"
                element={<ChangePasswordPage />}
              />{" "}
            </>
          )}

          {/* Admin page */}
          {UserService.isAdmin() && (
            <>
              <Route
                path="/admin-flight-management"
                element={<FlightManagementPage />}
              />
              <Route
                path="/admin-flight-detail/:flightId"
                element={<AdminFlightDetail />}
              />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
