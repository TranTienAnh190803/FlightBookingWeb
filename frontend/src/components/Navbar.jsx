import { Link } from "react-router-dom";
import UserService from "../services/UserService";
import { useEffect, useState } from "react";
import {
  FaBell,
  FaLock,
  FaNewspaper,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import image1 from "../assets/user.jpg";

export default function Navbar() {
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState(null);

  const fetchProfile = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const userProfile = await UserService.getProfile(token);
      setProfile(userProfile.user);
    }
  };

  const fetchAvatar = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const userAvatar = await UserService.getAvatar(token);
      setAvatar(URL.createObjectURL(userAvatar));
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAvatar();
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-3 fs-6">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        {UserService.isAdmin() ? (
          <Link className="navbar-brand ms-5 fs-3 fw-bold" to={"/"}>
            Admin
          </Link>
        ) : (
          <Link className="navbar-brand ms-5 fs-3 fw-bold" to={"/home"}>
            TTAFlight
          </Link>
        )}

        {/* Navigate */}
        <div
          className="collapse navbar-collapse justify-content-center fs-5"
          id="navbarSupportedContent"
        >
          {UserService.isAdmin() ? (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to={"/admin-flight-management"}>
                  Flight Management
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to={"/"}>
                  Feedback
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link className="nav-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to={"/flights"}>
                  Flights
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to={"/"}>
                  Contact
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to={"/"}>
                  About
                </Link>
              </li>
            </ul>
          )}
        </div>
        {/* mini profile */}
        {UserService.isAuthenticated() ? (
          <div className="btn-group me-5">
            <button
              type="button"
              className="btn btn-outline-secondary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ height: "50px" }}
            >
              <div style={{ height: "100%" }}>
                <img
                  src={avatar ? avatar : image1}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ height: "100%", marginRight: "8px" }}
                />
                {profile.username}
              </div>
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end p-0 shadow rounded"
              style={{ minWidth: "250px" }}
            >
              <li className="bg-light px-3 py-3 border-bottom">
                <strong className="fs-4 d-block">{profile.name}</strong>
                <span className="text-muted small">{profile.email}</span>
              </li>

              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-3 px-3 py-2"
                  to={`/user/profile`}
                >
                  <FaUser />
                  Profile
                </Link>
              </li>
              {UserService.isAdmin() ? (
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-3 px-3 py-2"
                    to="/"
                  >
                    <FaBell />
                    Notification
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-3 px-3 py-2"
                    to="/"
                  >
                    <FaNewspaper />
                    Booking History
                  </Link>
                </li>
              )}
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-3 px-3 py-2"
                  to={`/user/change-password`}
                >
                  <FaLock />
                  Change Password
                </Link>
              </li>

              <li>
                <hr className="dropdown-divider my-1" />
              </li>

              <li>
                <Link
                  className="dropdown-item text-danger d-flex align-items-center gap-3 px-3 py-2"
                  to="/login"
                >
                  <FaSignOutAlt />
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="d-flex align-items-center gap-2 me-5">
            <Link className="btn btn-light" to={"/login"}>
              Login
            </Link>
            <Link className="btn btn-outline-light" to={"/register"}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
