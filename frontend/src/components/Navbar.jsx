import { Link, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { useEffect, useState } from "react";
import {
  FaLock,
  FaMailBulk,
  FaNewspaper,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import image1 from "../assets/user.jpg";
import MailService from "../services/MailService";

export default function Navbar() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [mailList, setMailList] = useState([]);

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
      if (userAvatar !== null) {
        setAvatar(URL.createObjectURL(userAvatar));
      }
    }
  };

  const fetchMail = async () => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const response = await MailService.getAllMail(token);
      if (response.statusCode === 200) {
        setMailList(response.mailList);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAvatar();
    fetchMail();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();

    if (UserService.isAuthenticated()) {
      UserService.logout();
      navigate("/login");
      window.location.reload();
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-3 fs-6">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        {UserService.isAdmin() ? (
          <Link
            className="navbar-brand ms-5 fs-3 fw-bold"
            to={"/admin/flight-management"}
          >
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
                <Link className="nav-link mx-2" to={"/admin/flight-management"}>
                  Flight Management
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2" to={"/admin/user-management"}>
                  User Management
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link mx-2"
                  to={"/admin/booking-management"}
                >
                  Booking Management
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
                <Link className="nav-link" to={"/contact"}>
                  Contact
                </Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link" to={"/about"}>
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
                    className="dropdown-item d-flex align-items-center gap-3 px-3 py-2 position-relative"
                    to="/admin/mail-management"
                  >
                    <FaMailBulk />
                    Mail
                    {mailList.filter((value) => !value.status).length > 0 && (
                      <span className="badge rounded-pill text-bg-danger position-absolute end-0 me-2">
                        {mailList.filter((value) => !value.status).length}
                      </span>
                    )}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center gap-3 px-3 py-2"
                    to="/user/booking-history"
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
                <button
                  className="dropdown-item text-danger d-flex align-items-center gap-3 px-3 py-2"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  Logout
                </button>
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
