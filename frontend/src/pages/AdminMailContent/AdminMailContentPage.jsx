import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import style from "./AdminMailContentPage.module.css";
import UserService from "../../services/UserService";
import MailService from "../../services/MailService";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

export default function AdminMailContentPage() {
  const navigate = useNavigate();
  const { mailId } = useParams();
  const [selectedMail, setSelectedMail] = useState({});
  const [isReply, setIsReply] = useState(false);
  const [reply, setReply] = useState({
    email: "",
    content: "",
  });

  const fetchSelectedMail = async () => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const response = await MailService.getSelectedMail(token, mailId);
      if (response.statusCode === 200) {
        setSelectedMail(response.mail);
      } else {
        alert(response.message);
        navigate("/admin/mail-management");
      }
    }
  };

  useEffect(() => {
    fetchSelectedMail();
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

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <Sidebar />
        <div className={style["container"]}>
          <div className={`${style["mail-content"]} shadow p-5`}>
            <div className="position-relative">
              <p>
                <b>Sender: </b> {selectedMail.fullName}
              </p>
              <p>
                <b>Email: </b> {selectedMail.email}
              </p>
              <p>
                <b>Title: </b> {selectedMail.title}
              </p>
              <p className="lh-lg my-4">
                {selectedMail.content?.split("\n").map((value, index) => {
                  return (
                    <span key={index}>
                      {value} <br />
                    </span>
                  );
                })}
              </p>
              <p className="text-dark text-opacity-50 position-absolute top-0 end-0">
                {getFullDate(selectedMail.sendDate)}
              </p>
              <div className="mt-5 text-end">
                <p
                  className="fs-5"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsReply(!isReply);
                    setReply({ ...reply, email: selectedMail.email });
                  }}
                >
                  <a className="link-primary-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover">
                    Send Reply
                  </a>
                </p>
              </div>
            </div>
          </div>
          {isReply && (
            <div className={`${style["mail-content"]} shadow mt-3 p-5`}>
              <form>
                <p>
                  <b>Email:</b> {selectedMail.email}
                </p>
                <div className="mt-3">
                  <p>
                    <b>Content: </b>
                  </p>
                  <textarea
                    name="content"
                    className="form-control border-secondary"
                    value={reply.content}
                    onChange={(e) => {
                      setReply({ ...reply, [e.target.name]: e.target.value });
                    }}
                    required
                  ></textarea>
                </div>
                <div className="text-end mt-5">
                  <button className="btn btn-lg btn-success">Send</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
