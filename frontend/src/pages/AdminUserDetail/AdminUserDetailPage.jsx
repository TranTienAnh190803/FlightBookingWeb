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

  const fetchUserAvatar = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getUserAvatarById(token, id);
      setAvatar(URL.createObjectURL(response));
    }
  };

  useEffect(() => {
    document.title = "User Detail";
    fetchSelectUser();
    fetchUserAvatar();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const submitter = e.nativeEvent.submitter;
      const action = submitter.name;

      if (action === "deleteAccount") {
        if (
          confirm(
            "Are you sure you want to DELETE this account (every information of this USER will not be RESTORE)?"
          )
        ) {
          const response = await UserService.deleteAccount(token, id);
          if (response.statusCode === 200) {
            alert(response.message);
            navigate("/admin/user-management");
          } else {
            alert(response.message);
          }
        }
      } else if (action === "resetPassword") {
        if (confirm("Are you sure you want to RESET this account PASSWORD?")) {
          const response = await UserService.resetPassword(token, id);
          alert(response.message);
        }
      }
    }
  };

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
          <form onSubmit={handleSubmit}>
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
              <button
                type="submit"
                className="btn btn-danger btn-lg"
                name="deleteAccount"
              >
                Delete Account
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                name="resetPassword"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
