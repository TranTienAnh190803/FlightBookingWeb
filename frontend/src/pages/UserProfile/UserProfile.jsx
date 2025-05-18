import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import style from "./userProfile.module.css";
import image1 from "../../assets/user.jpg";
import Footer from "../../components/Footer";

export default function UserProfilePage() {
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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.updateProfile(token, profile);
      if (response.statusCode === 200) {
        alert(response.message);
        navigate(0);
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        {/* Sidebar */}
        <Sidebar avatar={avatar} />
        {/* Profile */}
        <div className={`${style["profile"]} shadow`}>
          <h1>
            <b>Profile</b>
          </h1>
          <hr />
          <form onSubmit={handleUpdateProfile}>
            <div className={style["form-container1"]}>
              <div className={style["image"]}>
                <img
                  src={avatar ? avatar : image1}
                  alt=""
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
                  <label>
                    <b>Name: </b>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Email: </b>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={style["info"]}>
                  <label>
                    <b>Phone Number: </b>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="phoneNumber"
                    value={profile.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className={style["form-container2"]}>
              <div className={style["role"]}>
                <p>
                  <b>Role: </b>
                </p>
                <input
                  className="form-control"
                  type="text"
                  name="role"
                  value={profile.role}
                  readOnly={true}
                />
              </div>
              <div className={style["gender"]}>
                <p>
                  <b>Gender: </b>
                </p>
                <select
                  className={`${style["combo-box"]} form-select`}
                  name="gender"
                  onChange={handleInputChange}
                >
                  <option value="true" selected={profile.gender === true}>
                    Male
                  </option>
                  <option value="false" selected={profile.gender === false}>
                    Female
                  </option>
                </select>
              </div>
              <div className={style["birth"]}>
                <p>
                  <b>Date Of Birth: </b>
                </p>
                <input
                  className="form-control"
                  type="date"
                  name="dateOfBirth"
                  value={profile.dateOfBirth}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className={style["form-container3"]}>
              <p>
                <b>Address: </b>
              </p>
              <input
                className="form-control"
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
      <Footer />
    </div>
  );
}
