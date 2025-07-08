import {
  FaUser,
  FaMailBulk,
  FaPhone,
  FaMapPin,
  FaLock,
  FaCalendar,
  FaAngleDown,
} from "react-icons/fa";
import style from "./RegisterPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    dateOfBirth: null,
    address: "",
    phoneNumber: "",
    email: "",
    role: "USER",
  });
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Register";
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.password === repeatPassword) {
        const response = await UserService.register(formData);
        console.log(response);
        if (response.statusCode === 200) {
          const login = await UserService.login(
            formData.username,
            formData.password
          );
          if (login.token) {
            localStorage.setItem("token", login.token);
            localStorage.setItem("role", login.role);
            navigate("/home");
            window.location.reload();
          } else {
            alert(login.message);
          }
        } else {
          alert(response.message);
        }
      } else {
        alert("Re-enter Password Does Not Match.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={`${style["register"]}`}>
      <div className={style["wrapper"]}>
        <form onSubmit={handleSubmit}>
          <h1>
            <b>Register</b>
          </h1>
          <div className={style["input-box"]}>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              required
              value={formData.name}
              onChange={onChangeHandler}
            />
            <FaUser className={style["icon"]} />
          </div>
          <div className={style["input-box"]}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              value={formData.username}
              onChange={onChangeHandler}
            />
            <FaUser className={style["icon"]} />
          </div>
          <div className={style["input-box"]}>
            <input
              type="date"
              name="dateOfBirth"
              required
              value={formData.dateOfBirth}
              onChange={onChangeHandler}
            />
            <FaCalendar className={style["icon"]} />
          </div>
          <div className={style["input-box"]}>
            <input
              type="text"
              placeholder="Email"
              name="email"
              required
              value={formData.email}
              onChange={onChangeHandler}
            />
            <FaMailBulk className={style["icon"]} />
          </div>
          <div className={style["input-box"]}>
            <input
              type="text"
              placeholder="Phone Number"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={onChangeHandler}
            />
            <FaPhone className={style["icon"]} />
          </div>
          <div className={style["input-box"]}>
            <select name="gender" onChange={onChangeHandler} required>
              <option value="" hidden disabled selected>
                Gender
              </option>
              <option value={true}>Male</option>
              <option value={false}>Female</option>
            </select>
            <FaAngleDown
              className={style["icon"]}
              style={{ pointerEvents: "none" }}
            />
          </div>
          <div className={style["input-box"]}>
            <input
              type="text"
              placeholder="Address"
              name="address"
              required
              value={formData.address}
              onChange={onChangeHandler}
            />
            <FaMapPin className={style["icon"]} />
          </div>
          <div className={style["input-box"]}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={formData.password}
              onChange={onChangeHandler}
            />
            <FaLock className={style["icon"]} />
          </div>
          <div className={style["input-box"]}>
            <input
              type="password"
              placeholder="Repeat Password"
              name="repeatPassword"
              required
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />
            <FaLock className={style["icon"]} />
          </div>

          <div className={style["check"]}>
            <label>
              <input type="checkbox" name="confirm" required /> I confirm that
              the information I have provided is correct.
            </label>
          </div>

          <button type="submit">Register</button>

          {error && <p className={style["error-message"]}>{error}</p>}

          <hr />

          <div className={style["login"]}>
            <p>
              Already have an account?{" "}
              <Link className={style["to-login"]} to={"/login"}>
                {" "}
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
