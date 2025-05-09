import { useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import style from "./RegisterAdminPage.module.css";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

export default function RegisterAdminPage() {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({
    name: "",
    username: "",
    password: "",
    dateOfBirth: new Date(),
    address: "",
    phoneNumber: "",
    email: "",
    gender: true,
  });
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setAdminInfo({ ...adminInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAuthenticated()) {
      if (adminInfo.password !== repeatPassword) {
        alert("Password and Re-entered Password must MATCH");
      } else {
        const token = localStorage.getItem("token");
        const response = await UserService.registerAdmin(token, adminInfo);
        if (response.statusCode === 200) {
          alert(response.message);
          navigate(0);
        } else {
          alert(response.message);
        }
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["register-admin"]}>
          <h1>
            <b>Register Admin</b>
          </h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className={style["input-container"]}>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Fullname: </b>
                  </p>
                  <input
                    type="text"
                    name="name"
                    className="form-control border border-secondary"
                    value={adminInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Username: </b>
                  </p>
                  <input
                    type="text"
                    name="username"
                    className="form-control border border-secondary"
                    value={adminInfo.username}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Email: </b>
                  </p>
                  <input
                    type="text"
                    name="email"
                    className="form-control border border-secondary"
                    value={adminInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Phone Number: </b>
                  </p>
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control border border-secondary"
                    value={adminInfo.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Date Of Birth: </b>
                  </p>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="form-control border border-secondary"
                    value={adminInfo.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Gender: </b>
                  </p>
                  <select
                    className="form-select border border-secondary"
                    name="gender"
                    onChange={handleInputChange}
                    defaultValue={true}
                    required
                  >
                    <option value="true">Male</option>
                    <option value="false">Female</option>
                  </select>
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Address: </b>
                  </p>
                  <input
                    type="text"
                    name="address"
                    className="form-control border border-secondary"
                    value={adminInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Password: </b>
                  </p>
                  <input
                    type="password"
                    name="password"
                    className="form-control border border-secondary"
                    value={adminInfo.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Re-enter Password: </b>
                  </p>
                  <input
                    type="password"
                    name="passwordRepeat"
                    className="form-control border border-secondary"
                    value={repeatPassword}
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
            </div>
            <div className={style["button-group"]}>
              <button className="btn btn-success btn-lg">Register</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
