import {
  FaBell,
  FaCog,
  FaHome,
  FaLock,
  FaNewspaper,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import image1 from "../assets/user.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";

export default function Sidebar({ avatar }) {
  const [profile, setProfile] = useState({});
  const [userDefaultAvatar, setUserDefaultAvatar] = useState(image1);

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
      setUserDefaultAvatar(URL.createObjectURL(userAvatar));
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAvatar();
  }, []);

  return (
    <div
      className="list-group bg-white shadow"
      style={{
        minWidth: "20%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div className="p-3 d-flex align-items-center gap-3">
        <img
          src={avatar ? avatar : userDefaultAvatar}
          alt="Avatar"
          className="rounded-circle"
          style={{ width: "60px", height: "60px", objectFit: "cover" }}
        />

        <div>
          <h5 className="mb-0 fw-bold">{profile.name}</h5>
          <small className="text-muted">{profile.email}</small>
        </div>
      </div>

      <hr className="my-1" />
      <Link
        to="/user/profile"
        className="list-group-item list-group-item-action border-0"
      >
        <FaUser className="me-3" />
        Profile
      </Link>
      {UserService.isAdmin ? (
        <Link
          to="/"
          className="list-group-item list-group-item-action border-0 bg-secondary text-white"
        >
          <FaBell className="me-3" />
          Notification
        </Link>
      ) : (
        <Link
          to="/"
          className="list-group-item list-group-item-action border-0"
        >
          <FaNewspaper className="me-3" />
          Booking History
        </Link>
      )}
      <Link
        to="/user/change-password"
        className="list-group-item list-group-item-action border-0"
      >
        <FaLock className="me-3" />
        Change Password
      </Link>

      <hr className="my-1" />
      <Link
        to="/login"
        className="list-group-item list-group-item-action border-0 text-danger"
      >
        <FaSignOutAlt className="me-3" />
        Logout
      </Link>
    </div>
  );
}
