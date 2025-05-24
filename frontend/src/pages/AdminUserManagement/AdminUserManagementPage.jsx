import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import style from "./AdminUserManagementPage.module.css";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import Footer from "../../components/Footer";

export default function AdminUserManagementPage() {
  const [userList, setUserList] = useState([]);
  const [message, setMessage] = useState("");
  const [noUser, setNoUser] = useState(false);

  const fetchUserList = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await UserService.getAllUser(token);
      if (response.statusCode === 200) {
        setUserList(response.userList);
      } else {
        setMessage(response.message);
        setNoUser(true);
      }
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["user-list"]}>
          <h1>
            <b>User List</b>
          </h1>
          <hr />
          <div className="text-end my-4">
            <Link
              className="btn btn-success btn-lg"
              to={"/admin/register-admin"}
            >
              Register New Admin
            </Link>
          </div>
          {noUser ? (
            <center className="my-5">
              <h3>{message}</h3>
            </center>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="table table-striped table-hover text-center">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Fullname</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {userList.map((user, index) => {
                    return (
                      <tr key={index}>
                        <th scope="row">{user.id}</th>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                          <span>
                            <Link
                              to={`/admin/user-detail/${user.id}`}
                              className="btn btn-outline-primary"
                            >
                              Detail
                            </Link>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
