import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import style from "./ContactPage.module.css";
import { useState } from "react";
import MailService from "../../services/MailService";

export default function ContactPage() {
  const navigate = useNavigate();
  const [mailForm, setMailForm] = useState({});

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMailForm({ ...mailForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await MailService.sendMail(mailForm);

    if (response.statusCode === 200) {
      alert(response.message);
      navigate(0);
    } else {
      alert(response.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["contact"]} shadow`}>
          <h1>
            <b>Contact</b>
          </h1>
          <hr />
          <form className={style["contact-info"]} onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between mb-3">
              <div className={style["input-box"]}>
                <p>
                  <b>Fullname:</b>
                </p>
                <input
                  type="text"
                  name="fullName"
                  className="form-control border-secondary"
                  value={mailForm.fullName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={style["input-box"]}>
                <p>
                  <b>Email:</b>
                </p>
                <input
                  type="text"
                  name="email"
                  className="form-control border-secondary"
                  value={mailForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="my-5">
              <p>
                <b>Title:</b>
              </p>
              <input
                type="text"
                name="title"
                className="form-control border-secondary"
                value={mailForm.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mt-3">
              <p>
                <b>Content: </b>
              </p>
              <textarea
                name="content"
                className="form-control border-secondary"
                value={mailForm.content}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className="mt-5 text-end">
              <button className="btn btn-lg btn-primary">Send</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
