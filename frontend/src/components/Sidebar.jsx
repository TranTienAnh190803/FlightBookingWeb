import {
  FaBell,
  FaCog,
  FaHome,
  FaLock,
  FaNewspaper,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import avatar from "../assets/images1.jpg";
import { Link } from "react-router-dom";

export default function Sidebar({ name, email }) {
  return (
    <div>
      <div
        className="list-group bg-white shadow"
        style={{
          width: "20%",
          position: "absolute",
          left: "20px",
          top: "100px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div className="p-3 d-flex align-items-center gap-3">
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-circle"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />

          <div>
            <h5 className="mb-0 fw-bold">{name}</h5>
            <small className="text-muted">{email}</small>
          </div>
        </div>

        <hr className="my-1" />
        <Link
          to="/"
          className="list-group-item list-group-item-action border-0"
        >
          <FaUser className="me-3" />
          Profile
        </Link>
        <Link
          to="/"
          className="list-group-item list-group-item-action border-0 bg-secondary text-white"
        >
          <FaBell className="me-3" />
          Notification
        </Link>
        <Link
          to="/"
          className="list-group-item list-group-item-action border-0"
        >
          <FaNewspaper className="me-3" />
          Booking History
        </Link>
        <Link
          to="/"
          className="list-group-item list-group-item-action border-0"
        >
          <FaLock className="me-3" />
          Change Password
        </Link>

        <hr className="my-1" />
        <Link
          to="/"
          className="list-group-item list-group-item-action border-0 text-danger"
        >
          <FaSignOutAlt className="me-3" />
          Logout
        </Link>
      </div>
    </div>
  );
}
