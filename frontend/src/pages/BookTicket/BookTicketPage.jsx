import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import style from "./BookTicketPage.module.css";
import UserService from "../../services/UserService";
import FlightService from "../../services/FlightService";
import { useEffect, useState } from "react";
import { FaPlane } from "react-icons/fa";
import Footer from "../../components/Footer";

export default function BookTicketPage() {
  const { flightId } = useParams("flightId");
  const navigate = useNavigate();
  const [selectedFlight, setSelectedFlight] = useState({});

  const fetchSelectedFlight = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await FlightService.getSelectedFlight(token, flightId);
      if (response.statusCode === 200) {
        setSelectedFlight(response.flight);
      } else {
        alert(response.message);
        navigate("/flights");
      }
    }
  };

  useEffect(() => {
    fetchSelectedFlight();
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
        <div className={style["booking"]}>
          <div className={style["seat-number"]}>
            <h1>
              <b>Seat</b>
            </h1>
            <hr />
          </div>
          <div className={style["information"]}>
            <div className={style["flight-info"]}>
              <h1>
                <b>Flight Infomation</b>
              </h1>
              <hr />
              <div>
                <div className={`${style["schedule"]} my-5`}>
                  <div className="text-center">
                    <b>{selectedFlight.departureCity}</b> <br />
                    <small>{selectedFlight.departureAirport}</small>
                  </div>
                  <div
                    className={`${style["travel-time"]} w-50`}
                    style={{ display: "inline-block" }}
                  >
                    <hr className="mx-3 my-1" />
                    <FaPlane className={style["plane"]} />
                    <p className={style["time"]}>
                      {getTimeDifference(
                        selectedFlight.departureDate,
                        selectedFlight.arrivalDate
                      )}
                    </p>
                  </div>
                  <div className="text-center">
                    <b>{selectedFlight.destinationCity}</b> <br />
                    <small>{selectedFlight.destinationAirport}</small>
                  </div>
                </div>
                <ul className="my-2">
                  <li className="my-2">
                    <div className="d-flex gap-5">
                      <span>
                        <b>Flight ID: </b> {selectedFlight.flightId}
                      </span>
                      <span>
                        <b>Airline: </b> {selectedFlight.airline}
                      </span>
                    </div>
                  </li>
                  <li className="my-2">
                    <b>Departure Date: </b>{" "}
                    {getDate(selectedFlight.departureDate)}
                  </li>
                  {selectedFlight.roundTrip && (
                    <li className="my-2">
                      <b>Return Date: </b> {getDate(selectedFlight.returnDate)}{" "}
                      - <b>Time: </b> {getTime(selectedFlight.returnDate)}
                    </li>
                  )}
                  <li className="my-2">
                    <b>Plane Type: </b> {selectedFlight.planeType}
                  </li>
                  <li className="my-2">
                    <b>Adult price: </b>{" "}
                    {selectedFlight.adultPrice?.toLocaleString("vi-VN")} VNĐ
                  </li>
                  <li className="my-2">
                    <b>Children price: </b>{" "}
                    {selectedFlight.childrenPrice?.toLocaleString("vi-VN")} VNĐ
                  </li>
                  <li className="my-2">
                    <b>Baby price: </b>{" "}
                    {selectedFlight.babyPrice?.toLocaleString("vi-VN")} VNĐ
                  </li>
                  <li className="my-2">
                    <b>Remain: </b>{" "}
                    <span
                      className={`${
                        selectedFlight.remain < 10 && "text-danger"
                      }`}
                    >
                      {selectedFlight.remain}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className={`${style["payment-info"]} mt-3`}>
              <h1>
                <b>Payment</b>
              </h1>
              <hr />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
