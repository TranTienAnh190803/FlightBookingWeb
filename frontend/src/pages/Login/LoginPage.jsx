import { FaLock, FaUser } from "react-icons/fa";
import style from "./LoginPage.module.css";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await UserService.login(username, password);

      if (userData.token) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        navigate("/");
        window.location.reload();
      } else {
        alert(userData.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className={`${style["login"]}`}>
      <div className={style["wrapper"]}>
        <form onSubmit={handleSubmit}>
          <h1>
            <b>Login</b>
          </h1>
          <div className={style["input-box"]}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <FaUser className={style["icon"]} />
          </div>
          <div className={style["input-box"]}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <FaLock className={style["icon"]} />
          </div>

          <div className={style["remember-pass"]}>
            <label>
              <input type="checkbox" name="Remember" /> Remember me
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Login</button>

          <hr />

          <div className={style["register"]}>
            <p>
              Don't have an account?{" "}
              <Link className={style["to-register"]} to={"/register"}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
