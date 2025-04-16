import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import style from "./userProfile.module.css";
import image1 from "../../assets/user.jpg";

export default function UserProfile() {
  const navigate = useNavigate();
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

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdateProfile = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.updateProfile(token, profile);
      navigate(0);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        {/* Sidebar */}
        <Sidebar avatar={avatar} />
        {/* Profile */}
        <div className={style["profile"]}>
          <h3>Profile</h3>
          <hr />
          <form onSubmit={handleUpdateProfile}>
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
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style["info"]}>
                  <label>Email: </label>
                  <input
                    type="text"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style["info"]}>
                  <label>Phone Number: </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className={style["form-container2"]}>
              <div className={style["gender"]}>
                <p>Gender: </p>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value={true}
                    checked={profile.gender === true}
                    onChange={handleInputChange}
                  />{" "}
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value={false}
                    checked={profile.gender === false}
                    onChange={handleInputChange}
                  />{" "}
                  Female
                </label>
              </div>
              <div className={style["birth"]}>
                <p>Date Of Birth: </p>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={style["form-container3"]}>
              <p>Address: </p>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleInputChange}
              />
            </div>
            <div className={style["btn-box"]}>
              <button className="btn btn-success">Update Profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
