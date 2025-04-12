import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserService";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

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
      <div>
        <Sidebar name={profile.name} email={profile.email} />
      </div>
    </div>
  );
}
