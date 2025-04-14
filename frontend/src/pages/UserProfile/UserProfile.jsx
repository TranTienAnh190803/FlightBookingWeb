import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import style from "./userProfile.module.css";
import image1 from "../../assets/user.jpg";

export default function UserProfile() {
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState({});
  const [avatar, setAvatar] = useState(null);

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
      setAvatar(URL.createObjectURL(userAvatar));
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchAvatar();
  }, []);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    const token = localStorage.getItem("token");
    const response = await UserService.uploadAvatar(token, file);
    if (response.statusCode === 200) {
      alert(response.message);
      fetchAvatar();
    } else alert(response.message);
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        {/* Sidebar */}
        <Sidebar name={profile.name} email={profile.email} avatar={avatar} />
        {/* Profile */}
        <div className={style["profile"]}>
          <h3>Profile</h3>
          <hr />
          <form>
            <div className={style["form-container1"]}>
              <div className={style["image"]}>
                <img
                  src={avatar ? avatar : image1}
                  alt="image"
                  className="rounded-circle"
                  onClick={handleImageClick}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
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
