import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import BookingHistoryPage from "./pages/BookingHistory/BookingHistoryPage.jsx";
import BookingDetailPage from "./pages/BookingDetail/BookingDetailPage.jsx";
import ContactPage from "./pages/Contact/ContactPage.jsx";
import AdminMailPage from "./pages/AdminMail/AdminMailPage.jsx";
import AdminMailContentPage from "./pages/AdminMailContent/AdminMailContentPage.jsx";
import BookingManagementPage from "./pages/BookingManagement/BookingManagementPage.jsx";
import BookedInfoPage from "./pages/BookedInfo/BookedInfoPage.jsx";
import AboutPage from "./pages/About/AboutPage.jsx";

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
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Unauthenticated Page */}
          {!UserService.isAuthenticated() && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          )}

          {/* Authentication Page */}
          {UserService.isAuthenticated() && (
            <>
              <Route path="/user/profile" element={<UserProfilePage />} />{" "}
              <Route
                path="/user/change-password"
                element={<ChangePasswordPage />}
              />{" "}
            </>
          )}

          {/* Admin Page */}
          {UserService.isAdmin() && (
            <>
              <Route
                path="/admin/flight-management"
                element={<FlightManagementPage />}
              />
              <Route
                path="/admin/booking-management"
                element={<BookingManagementPage />}
              />
              <Route
                path="/admin/booked-info/:ticketId"
                element={<BookedInfoPage />}
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
              <Route
                path="/admin/mail-management"
                element={<AdminMailPage />}
              />
              <Route
                path="/admin/mail-content/:mailId"
                element={<AdminMailContentPage />}
              />
            </>
          )}

          {/* Not Admin Page */}
          {UserService.isAdmin() || (
            <>
              <Route path="/flights" element={<FlightsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </>
          )}

          {/* User Page */}
          {UserService.isUser() && (
            <>
              <Route
                path="/user/book-ticket/:flightId"
                element={<BookTicketPage />}
              />
              <Route
                path="/user/booking-history"
                element={<BookingHistoryPage />}
              />
              <Route
                path="/user/booking-detail/:ticketId"
                element={<BookingDetailPage />}
              />
            </>
          )}

          {/* Not Exist Page or Unauthorized Page*/}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
