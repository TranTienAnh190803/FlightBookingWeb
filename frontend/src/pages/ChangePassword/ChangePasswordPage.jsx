import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import style from "./ChangePasswordPage.module.css";
import UserService from "../../services/UserService";
import Footer from "../../components/Footer";

export default function ChangePasswordPage() {
  const [changePass, setChangePass] = useState({
    oldPassword: "",
    password: "",
  });
  const [repeatPassword, setRepeatPassword] = useState("");

  useEffect(() => {
    document.title = "Password Changing";
  }, []);

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setChangePass({ ...changePass, [name]: value });
  };

  const handleSubmit = async (e) => {
    if (UserService.isAuthenticated()) {
      e.preventDefault();
      if (changePass.password === repeatPassword) {
        const token = localStorage.getItem("token");
        const response = await UserService.changePassword(token, changePass);
        alert(response.message);
        if (response.statusCode === 200) window.location.reload();
      } else {
        alert("Password Re-entered Incorrectly");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        {/* Sidebar */}
        <Sidebar />
        {/* Change Password */}
        <div className={`${style["change-password"]} shadow`}>
          <h1>
            <b>Change Password</b>
          </h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className={style["form-container"]}>
              <div className={style["password"]}>
                <p>
                  <b>Old Password:</b>
                </p>
                <input
                  type="password"
                  name="oldPassword"
                  className="form-control border border-secondary"
                  value={changePass.oldPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style["password"]}>
                <p>
                  <b>New Password:</b>
                </p>
                <input
                  type="password"
                  name="password"
                  className="form-control border border-secondary"
                  value={changePass.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className={style["password"]}>
                <p>
                  <b>Re-enter New Password:</b>
                </p>
                <input
                  type="password"
                  name="repeatPassword"
                  className="form-control border border-secondary"
                  value={repeatPassword}
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className={style["btn-box"]}>
              <button className="btn btn-success">Change Password</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
