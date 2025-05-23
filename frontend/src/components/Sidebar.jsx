import {
  FaLock,
  FaMailBulk,
  FaNewspaper,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import image1 from "../assets/user.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import MailService from "../services/MailService";

export default function Sidebar({ avatar }) {
  const [profile, setProfile] = useState({});
  const [userDefaultAvatar, setUserDefaultAvatar] = useState(image1);
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
        setUserDefaultAvatar(URL.createObjectURL(userAvatar));
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
      {UserService.isAdmin() ? (
        <Link
          to="/admin/mail-management"
          className="list-group-item list-group-item-action border-0 position-relative"
        >
          <FaMailBulk className="me-3" />
          Mail
          {mailList.filter((value) => !value.status).length > 0 && (
            <span className="badge rounded-pill text-bg-danger position-absolute end-0 me-2">
              {mailList.filter((value) => !value.status).length}
            </span>
          )}
        </Link>
      ) : (
        <Link
          to="/user/booking-history"
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
