import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./BookedInfoPage.module.css";
import UserService from "../../services/UserService";
import FlightTicketService from "../../services/FlightTicketService";
import Navbar from "../../components/Navbar";
import { FaPlane } from "react-icons/fa";
import Footer from "../../components/Footer";
import MailService from "../../services/MailService";

export default function BookedInfoPage() {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [bookedInfo, setBookedInfo] = useState({});
  const [clientInfo, setClientInfo] = useState([]);
  const [isSend, setIsSend] = useState(false);
  const [mail, setMail] = useState({
    email: "",
    subject: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchBookedInfo = async () => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const response = await FlightTicketService.getSelectedBookedInfo(
        token,
        ticketId
      );
      if (response.statusCode === 200) {
        setBookedInfo(response.bookedInfo);
        setClientInfo(response.clientInfoDTO);
      } else {
        alert(response.message);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    fetchBookedInfo();
  }, []);

  const getTimeDifference = (date1, date2) => {
    const dptDate = new Date(date1);
    const arvDate = new Date(date2);
    const diffMillis = Math.abs(arvDate - dptDate);

    const hours = String(Math.floor(diffMillis / (1000 * 60 * 60))).padStart(
      2,
      "0"
    );
    const minutes = String(
      Math.floor((diffMillis % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");

    return `${hours}h ${minutes}m`;
  };

  const getDate = (d) => {
    const date = new Date(d);

    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${dd}/${MM}/${yyyy}`;
  };

  const getTime = (d) => {
    const date = new Date(d);

    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    return `${hh}:${mm}`;
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    if (UserService.isAdmin()) {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await MailService.sendReply(token, mail);
      if (response.statusCode === 200) {
        alert(response.message);
        navigate(0);
      } else {
        alert(response.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["flight-info"]} shadow position-relative`}>
          <h1>
            <b>Flight Information</b>
          </h1>
          {bookedInfo.flight?.roundTrip && (
            <div className="position-absolute top-0 end-0">
              <span
                className="badge bg-primary text-white p-3"
                style={{ borderRadius: "0 0 0 0.5rem" }}
              >
                Round-trip
              </span>
            </div>
          )}
          <hr />
          <div>
            <div className={`${style["schedule"]} my-5`}>
              <div className="text-center">
                <b>{bookedInfo.flight?.departureCity}</b> <br />
                <small>{bookedInfo.flight?.departureAirport}</small> <br />
                <b style={{ fontSize: "12px", color: "green" }}>
                  {getDate(bookedInfo.flight?.departureDate)} |{" "}
                  {getTime(bookedInfo.flight?.departureDate)}
                </b>
              </div>
              <div
                className={`${style["travel-time"]} w-50 mb-5`}
                style={{ display: "inline-block" }}
              >
                <hr className="mx-3 my-1" />
                <FaPlane className={style["plane"]} />
                <p className={style["time"]}>
                  {getTimeDifference(
                    bookedInfo.flight?.departureDate,
                    bookedInfo.flight?.arrivalDate
                  )}
                </p>
              </div>
              <div className="text-center">
                <b>{bookedInfo.flight?.destinationCity}</b> <br />
                <small>{bookedInfo.flight?.destinationAirport}</small> <br />
                <b style={{ fontSize: "12px", color: "green" }}>
                  {getDate(bookedInfo.flight?.arrivalDate)} |{" "}
                  {getTime(bookedInfo.flight?.arrivalDate)}
                </b>
              </div>
            </div>
            <ul className="my-2">
              <li className="my-2">
                <div className="d-flex gap-5">
                  <span>
                    <b>Flight ID: </b> {bookedInfo.flight?.flightId}
                  </span>
                  <span>
                    <b>Airline: </b> {bookedInfo.flight?.airline}
                  </span>
                </div>
              </li>
              <li className="my-2">
                <b>Departure Date: </b>{" "}
                {getDate(bookedInfo.flight?.departureDate)} - <b>Time: </b>{" "}
                {getTime(bookedInfo.flight?.departureDate)}
              </li>
              <li className="my-2">
                <b>Arrival Date: </b> {getDate(bookedInfo.flight?.arrivalDate)}{" "}
                - <b>Time: </b> {getTime(bookedInfo.flight?.arrivalDate)}
              </li>
              {bookedInfo.flight?.roundTrip && (
                <li className="my-2">
                  <b>Return Date: </b> {getDate(bookedInfo.flight?.returnDate)}{" "}
                  - <b>Time: </b> {getTime(bookedInfo.flight?.returnDate)}
                </li>
              )}
              <li className="my-2">
                <b>Plane Type: </b> {bookedInfo.flight?.planeType}
              </li>
              <li className="my-2">
                <b>Capacity: </b> {bookedInfo.flight?.capacity}
              </li>
              <li className="my-2">
                <b>Remain: </b>{" "}
                <span
                  className={`${
                    bookedInfo.flight?.remain < 10 && "text-danger"
                  }`}
                >
                  {bookedInfo.flight?.remain}{" "}
                  {bookedInfo.flight?.remain === 0 && "(Full)"}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className={`${style["main-info"]}`}>
          <div className={`${style["booking-info"]} shadow`}>
            <h1>
              <b>Reservation Information</b>
            </h1>
            <hr />
            <div className="px-3">
              <div className="mt-5">
                <h3 className="mb-4">
                  <b>Ticket Booker:</b>
                </h3>
                <ul>
                  <li className="my-2">
                    <b>Username: </b> <span>{bookedInfo.username}</span>
                  </li>
                  <li className="my-2">
                    <b>Fullname: </b> <span>{bookedInfo.fullname}</span>
                  </li>
                  <li className="my-2">
                    <b>Email: </b> <span>{bookedInfo.email}</span>
                  </li>
                  <li className="my-2">
                    <b>Phone Number: </b> <span>{bookedInfo.phoneNumber}</span>
                  </li>
                </ul>
              </div>
              <div className="my-5">
                <h3 className="mb-4">
                  <b>Ticket Information:</b>
                </h3>
                <ul>
                  <li className="my-2">
                    <b>Ticket ID: </b> <span>{bookedInfo.ticketId}</span>
                  </li>
                  <li className="my-2">
                    <b>Adult: </b> <span>{bookedInfo.adultSeat}</span>
                  </li>
                  <li className="my-2">
                    <b>Children: </b> <span>{bookedInfo.childrenSeat}</span>
                  </li>
                  <li className="my-2">
                    <b>Baby: </b> <span>{bookedInfo.babySeat}</span>
                  </li>
                  <li className="my-2">
                    <b>Total Price: </b>{" "}
                    <span>
                      {bookedInfo.totalPrice?.toLocaleString("vi-VN")} VNĐ
                    </span>
                  </li>
                  <li className="my-2">
                    <b>Booking Date: </b>{" "}
                    <span>
                      {getDate(bookedInfo.bookingDate)} |{" "}
                      {getTime(bookedInfo.bookingDate)}
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4">
                  <b>Client Information:</b>
                </h3>
                <div style={{ overflowX: "auto" }}>
                  <table className="table table-secondary table-striped text-center">
                    <thead>
                      <tr>
                        <th scope="col">Seat</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Date Of Birth</th>
                        <th scope="col">Category</th>
                        <th scope="col">Passport/Identification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientInfo.map((value, index) => {
                        return (
                          <tr key={index}>
                            <th scope="row">{value.clientId}</th>
                            <td>{value.firstName}</td>
                            <td>{value.lastName}</td>
                            <td>{value.gender ? "Male" : "Female"}</td>
                            <td>{getDate(value.dateOfBirth)}</td>
                            <td>{value.ageCategory}</td>
                            <td>{value.passport}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="text-end my-3">
                <p
                  className="fs-5"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSend(!isSend);
                    setMail({
                      ...mail,
                      email: bookedInfo.email,
                      subject: `Message about ticket ${ticketId}`,
                    });
                  }}
                >
                  <a className="link-primary-emphasis link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover">
                    Send Mail
                  </a>
                </p>
              </div>
            </div>
          </div>
          {isSend && (
            <div className={`${style["mail-content"]} shadow mt-3 p-5`}>
              <form onSubmit={handleSendMail}>
                <p>
                  <b>To:</b> {bookedInfo.email}
                </p>
                <div className="d-flex align-items-center">
                  <p className="mb-0 me-3">
                    <b>Subject: </b>
                  </p>
                  <input
                    type="text"
                    name="subject"
                    className="form-control border-secondary"
                    value={mail.subject}
                    onChange={(e) => {
                      setMail({ ...mail, [e.target.name]: e.target.value });
                    }}
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
                    value={mail.content}
                    onChange={(e) => {
                      setMail({ ...mail, [e.target.name]: e.target.value });
                    }}
                    required
                  ></textarea>
                </div>
                <div className="text-end mt-5">
                  <button
                    className="btn btn-lg btn-success"
                    disabled={isLoading}
                  >
                    Send
                  </button>
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
