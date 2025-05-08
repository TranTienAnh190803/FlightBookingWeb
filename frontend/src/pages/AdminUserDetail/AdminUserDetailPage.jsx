import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import style from "./AdminUserDetailPage.module.css";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import defaultAvatar from "../../assets/user.jpg";
import Footer from "../../components/Footer";

export default function AdminUserDetailPage() {
  const { id } = useParams("id");
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState({});
  const [avatar, setAvatar] = useState(null);

  const fetchSelectUser = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getSelectedUser(token, id);
      if (response.statusCode === 200) {
        setSelectedUser(response.user);
      } else {
        alert(response.message);
        navigate("/admin/user-management");
      }
    }
  };

  useEffect(() => {
    fetchSelectUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["user-detail"]}>
          <h1>
            <b>
              User Detail: <span style={{ color: "blue" }}> </span>
            </b>
          </h1>
          <hr />
          <form>
            <div className={style["form-container1"]}>
              <div className={style["image"]}>
                <img
                  src={avatar ? avatar : defaultAvatar}
                  alt=""
                  className="rounded-circle"
                />
              </div>
              <div className={style["user-info"]}>
                <div className={style["info"]}>
                  <label>
                    <b>User Id: </b>
                  </label>
                  <input
                    className="form-control border border-secondary"
                    type="text"
                    name="id"
                    value={id}
                    disabled
                    readOnly
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Fullname: </b>
                  </label>
                  <input
                    className="form-control border border-secondary"
                    type="text"
                    name="name"
                    value={selectedUser.name}
                    disabled
                    readOnly
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Username: </b>
                  </label>
                  <input
                    className="form-control border border-secondary"
                    type="text"
                    name="username"
                    value={selectedUser.username}
                    disabled
                    readOnly
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Email: </b>
                  </label>
                  <input
                    className="form-control border border-secondary"
                    type="text"
                    name="email"
                    value={selectedUser.email}
                    disabled
                    readOnly
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Phone Number: </b>
                  </label>
                  <input
                    className="form-control border border-secondary"
                    type="text"
                    name="phoneNumber"
                    value={selectedUser.phoneNumber}
                    disabled
                    readOnly
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Gender: </b>
                  </label>
                  <input
                    className="form-control border border-secondary"
                    type="text"
                    name="gender"
                    value={selectedUser.gender ? "Male" : "Female"}
                    disabled
                    readOnly
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Date Of Birth: </b>
                  </label>
                  <input
                    className="form-control border border-secondary"
                    type="date"
                    name="dateOfBirth"
                    value={selectedUser.dateOfBirth}
                    disabled
                    readOnly
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Address: </b>
                  </label>
                  <input
                    className="form-control border border-secondary"
                    type="text"
                    name="address"
                    value={selectedUser.address}
                    disabled
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className={style["form-container2"]}>
              <button className="btn btn-danger btn-lg">Delete Account</button>
              <button className="btn btn-primary btn-lg">Reset Password</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
