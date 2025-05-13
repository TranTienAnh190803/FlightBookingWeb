import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import HomePage from "./pages/Home/HomePage.jsx";
import UserService from "./services/UserService.js";
import { useEffect, useState } from "react";
import ChangePasswordPage from "./pages/ChangePassword/ChangePasswordPage.jsx";
import axios from "axios";
import FlightsPage from "./pages/Flights/FlightsPage.jsx";
import FlightManagementPage from "./pages/FlightsManagement/FlightManagementPage.jsx";
import UserProfilePage from "./pages/UserProfile/UserProfile.jsx";
import AdminFlightDetailPage from "./pages/AdminFlightDetail/AdminFlightDetailPage.jsx";
import AdminAddFlightPage from "./pages/AdminAddFlight/AdminAddFlightPage.jsx";
import AdminUserManagementPage from "./pages/AdminUserManagement/AdminUserManagementPage.jsx";
import AdminUserDetailPage from "./pages/AdminUserDetail/AdminUserDetailPage.jsx";
import RegisterAdminPage from "./pages/RegisterAdmin/RegisterAdminPage.jsx";
import BookTicketPage from "./pages/BookTicket/BookTicketPage.jsx";

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
    handleRefreshToken();
    handleTokenExpired();
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
                path="/admin/flight-management"
                element={<FlightManagementPage />}
              />
              <Route
                path="/admin/flight-detail/:flightId"
                element={<AdminFlightDetailPage />}
              />
              <Route
                path="/admin/add-flight"
                element={<AdminAddFlightPage />}
              />
              <Route
                path="/admin/user-management"
                element={<AdminUserManagementPage />}
              />
              <Route
                path="/admin/user-detail/:id"
                element={<AdminUserDetailPage />}
              />
              <Route
                path="/admin/register-admin"
                element={<RegisterAdminPage />}
              />
            </>
          )}

          {/* User Page */}
          {UserService.isUser() && (
            <>
              <Route
                path="/user/book-ticket/:flightId"
                element={<BookTicketPage />}
              />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
