import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import style from "./userProfile.module.css";
import image1 from "../../assets/images1.jpg";

export default function UserProfile() {
  const [profile, setProfile] = useState({});

  const fetchProfile = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const userProfile = await UserService.getProfile(token);
      setProfile(userProfile.user);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        {/* Sidebar */}
        <Sidebar name={profile.name} email={profile.email} />
        {/* Profile */}
        <div className={style["profile"]}>
          <h3>Profile</h3>
          <hr />
          <form>
            <div className={style["form-container1"]}>
              <div className={style["image"]}>
                <img src={image1} alt="image" className="rounded-circle" />
              </div>
              <div className={style["user-info"]}>
                <div className={style["info"]}>
                  <label>Name: </label>
                  <input type="text" name="name" />
                </div>
                <div className={style["info"]}>
                  <label>Email: </label>
                  <input type="text" name="email" />
                </div>
                <div className={style["info"]}>
                  <label>Phone Number: </label>
                  <input type="text" name="phoneNumber" />
                </div>
              </div>
            </div>
            <div className={style["form-container2"]}>
              <div className={style["gender"]}>
                <p>Gender: </p>
                <label>
                  <input type="radio" name="gender" value={true} /> Male
                </label>
                <label>
                  <input type="radio" name="gender" value={false} /> Female
                </label>
              </div>
              <div className={style["birth"]}>
                <p>Date Of Birth: </p>
                <input type="date" name="dateOfBirth" />
              </div>
            </div>
            <div className={style["form-container3"]}>
              <p>Address: </p>
              <input type="text" name="address" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
