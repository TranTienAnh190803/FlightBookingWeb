import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import style from "./AdminMailPage.module.css";
import { useEffect, useState } from "react";
import UserService from "../../services/UserService";
import MailService from "../../services/MailService";
import { FaTrash } from "react-icons/fa";

export default function AdminMailPage() {
  const navigate = useNavigate();
  const [mailList, setMailList] = useState([]);
  const [check, setCheck] = useState({
    noMail: false,
    message: "",
  });

  const fetchMailList = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await MailService.getAllMail(token);
      if (response.statusCode === 200) {
        setMailList(response.mailList);
      } else if (response.statusCode === 404) {
        setCheck({
          noMail: true,
          message: response.message,
        });
      } else {
        alert(response.message);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchMailList();
  }, []);

  const getFullDate = (d) => {
    const date = new Date(d);

    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    return `${dd}/${MM}/${yyyy} | ${hh}:${mm}`;
  };

  const handleReadMail = async (mailId) => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await MailService.readMail(token, mailId);
      if (response.statusCode !== 200) {
        alert(response.message);
      }
    }
  };

  const handleDelete = async (e, mailId) => {
    e.preventDefault();
    e.stopPropagation();

    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      if (confirm("Do You Want To DELETE This Mail.")) {
        const response = await MailService.deleteMail(token, mailId);
        if (response.statusCode === 200) {
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
        <Sidebar />
        <div className={`${style["mail"]} shadow`}>
          <h1>
            <b>Mail</b>
          </h1>
          <hr />
          <div>
            {!check.noMail ? (
              <div className="list-group my-4">
                {mailList.map((value, index) => {
                  return (
                    <Link
                      className={`list-group-item list-group-item-action d-flex justify-content-between align-items-start position-relative ${
                        value.status || "bg-dark text-dark bg-opacity-10"
                      } ${style["mail-box"]}`}
                      to={`/admin/mail-content/${value.mailId}`}
                      key={index}
                      onClick={() => {
                        handleReadMail(value.mailId);
                      }}
                    >
                      <div className="ms-2 me-auto p-1">
                        <h4 className="fw-bold">{value.title}</h4>
                        <p className="my-3">Sender: {value.fullName}</p>
                        <p className="my-3">Email: {value.email}</p>
                      </div>
                      <span className="mt-2 badge text-bg-primary rounded-pill bg-opacity-100">
                        {`${getFullDate(value.sendDate)}`}
                      </span>
                      <button
                        className="btn btn-danger position-absolute bottom-0 end-0"
                        onClick={(e) => {
                          handleDelete(e, value.mailId);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="my-5">
                <center>
                  <h4>{check.message}</h4>
                </center>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
