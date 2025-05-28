import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import style from "./BookingDetailPage.module.css";
import Footer from "../../components/Footer";
import UserService from "../../services/UserService";
import FlightTicketService from "../../services/FlightTicketService";
import { useEffect, useState } from "react";
import { FaPlane } from "react-icons/fa";

export default function BookingDetailPage() {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const [selectedHistory, setSelectedHistory] = useState({});
  const [clientInfo, setClientInfo] = useState([]);

  // Fetch Function And useEffect
  const fetchSelectedHistory = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await FlightTicketService.getSelectedHistory(
        token,
        ticketId
      );

      if (response.statusCode === 200) {
        setSelectedHistory(response.flightHistory);
        setClientInfo(response.clientInfoDTO);
      } else {
        alert(response.message);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    document.title = "Booking Detail";
    fetchSelectedHistory();
  }, []);

  // Convert Function
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

  const getDate = (date1) => {
    const date = new Date(date1);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${dd}/${mm}/${yyyy}`;
  };

  const getTime = (date1) => {
    const date = new Date(date1);

    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    return `${hh}:${mm}`;
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={`${style["booking-info"]} shadow`}>
          <h1>
            <b>Reservation Information</b>
          </h1>
          <hr />
          <div className="px-3">
            <ul className="my-5">
              <li className="my-2">
                <b>Ticket ID: </b> <span>{selectedHistory.ticketId}</span>
              </li>
              <li className="my-2">
                <b>Adult: </b> <span>{selectedHistory.adultSeat}</span>
              </li>
              <li className="my-2">
                <b>Children: </b> <span>{selectedHistory.childrenSeat}</span>
              </li>
              <li className="my-2">
                <b>Baby: </b> <span>{selectedHistory.babySeat}</span>
              </li>
              <li className="my-2">
                <b>Total Price: </b>{" "}
                <span>
                  {selectedHistory.totalPrice?.toLocaleString("vi-VN")} VNĐ
                </span>
              </li>
              <li className="my-2">
                <b>Booking Date: </b>{" "}
                <span>
                  {getDate(selectedHistory.bookingDate)} |{" "}
                  {getTime(selectedHistory.bookingDate)}
                </span>
              </li>
            </ul>
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
          </div>
        </div>
        <div className={`${style["flight-info"]} shadow position-relative`}>
          <h1>
            <b>Flight Information</b>
          </h1>
          {selectedHistory.flight?.roundTrip && (
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
                <b>{selectedHistory.flight?.departureCity}</b> <br />
                <small>{selectedHistory.flight?.departureAirport}</small> <br />
                <b style={{ fontSize: "12px", color: "green" }}>
                  {getDate(selectedHistory.flight?.departureDate)} |{" "}
                  {getTime(selectedHistory.flight?.departureDate)}
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
                    selectedHistory.flight?.departureDate,
                    selectedHistory.flight?.arrivalDate
                  )}
                </p>
              </div>
              <div className="text-center">
                <b>{selectedHistory.flight?.destinationCity}</b> <br />
                <small>{selectedHistory.flight?.destinationAirport}</small>{" "}
                <br />
                <b style={{ fontSize: "12px", color: "green" }}>
                  {getDate(selectedHistory.flight?.arrivalDate)} |{" "}
                  {getTime(selectedHistory.flight?.arrivalDate)}
                </b>
              </div>
            </div>
            <ul className="my-2">
              <li className="my-2">
                <div className="d-flex gap-5">
                  <span>
                    <b>Flight ID: </b> {selectedHistory.flight?.flightId}
                  </span>
                  <span>
                    <b>Airline: </b> {selectedHistory.flight?.airline}
                  </span>
                </div>
              </li>
              <li className="my-2">
                <b>Departure Date: </b>{" "}
                {getDate(selectedHistory.flight?.departureDate)} - <b>Time: </b>{" "}
                {getTime(selectedHistory.flight?.departureDate)}
              </li>
              <li className="my-2">
                <b>Arrival Date: </b>{" "}
                {getDate(selectedHistory.flight?.arrivalDate)} - <b>Time: </b>{" "}
                {getTime(selectedHistory.flight?.arrivalDate)}
              </li>
              {selectedHistory.flight?.roundTrip && (
                <li className="my-2">
                  <b>Return Date: </b>{" "}
                  {getDate(selectedHistory.flight?.returnDate)} - <b>Time: </b>{" "}
                  {getTime(selectedHistory.flight?.returnDate)}
                </li>
              )}
              <li className="my-2">
                <b>Plane Type: </b> {selectedHistory.flight?.planeType}
              </li>
              <li className="my-2">
                <b>Capacity: </b> {selectedHistory.flight?.capacity}
              </li>
              <li className="my-2">
                <b>Remain: </b>{" "}
                <span
                  className={`${
                    selectedHistory.flight?.remain < 10 && "text-danger"
                  }`}
                >
                  {selectedHistory.flight?.remain}{" "}
                  {selectedHistory.flight?.remain === 0 && "(Full)"}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
