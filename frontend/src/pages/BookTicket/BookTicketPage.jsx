import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import style from "./BookTicketPage.module.css";
import UserService from "../../services/UserService";
import FlightService from "../../services/FlightService";
import { useEffect, useState } from "react";
import { FaBaby, FaChild, FaPlane } from "react-icons/fa";
import Footer from "../../components/Footer";
import { FaPerson } from "react-icons/fa6";
import FlightTicketService from "../../services/FlightTicketService";

export default function BookTicketPage() {
  const { flightId } = useParams("flightId");
  const navigate = useNavigate();
  const [selectedFlight, setSelectedFlight] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [reservation, setReservation] = useState({
    adultSeat: 1,
    childrenSeat: 0,
    babySeat: 0,
  });

  // fetch data function
  const fetchSelectedFlight = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await FlightService.getSelectedFlight(token, flightId);
      if (response.statusCode === 200) {
        setSelectedFlight(response.flight);
        setReservation({
          ...reservation,
          totalPrice: response.flight.price + response.flight.adultPrice,
        });
      } else {
        alert(response.message);
        navigate("/flights");
      }
    }
  };

  const fetchContactInfo = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await FlightTicketService.getContactInfo(token);
      if (response.statusCode === 200) {
        setContactInfo(response);
      } else {
        alert(response.message);
        navigate("/flights");
      }
    }
  };

  useEffect(() => {
    fetchSelectedFlight();
    fetchContactInfo();
  }, []);

  // convert function
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

  // handle function
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleAdultSeat = (e) => {
    const name = e.target.name;
    const adult = reservation.adultSeat;
    const adultPrice = selectedFlight.adultPrice;
    const total = reservation.totalPrice;
    if (name === "minus") {
      if (adult > 1) {
        setReservation({
          ...reservation,
          adultSeat: adult - 1,
          totalPrice: total - adultPrice,
        });
      }
    } else if (name === "plus") {
      setReservation({
        ...reservation,
        adultSeat: adult + 1,
        totalPrice: total + adultPrice,
      });
    }
  };

  const handleChildrenSeat = (e) => {
    const name = e.target.name;
    const children = reservation.childrenSeat;
    const childrenPrice = selectedFlight.childrenPrice;
    const total = reservation.totalPrice;
    if (name === "minus") {
      if (children > 0) {
        setReservation({
          ...reservation,
          childrenSeat: children - 1,
          totalPrice: total - childrenPrice,
        });
      }
    } else if (name === "plus") {
      setReservation({
        ...reservation,
        childrenSeat: children + 1,
        totalPrice: total + childrenPrice,
      });
    }
  };

  const handleBabySeat = (e) => {
    const name = e.target.name;
    const baby = reservation.babySeat;
    const babyPrice = selectedFlight.babyPrice;
    const total = reservation.totalPrice;
    if (name === "minus") {
      if (baby > 0) {
        setReservation({
          ...reservation,
          babySeat: baby - 1,
          totalPrice: total - babyPrice,
        });
      }
    } else if (name === "plus") {
      setReservation({
        ...reservation,
        babySeat: baby + 1,
        totalPrice: total + babyPrice,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["booking"]}>
          <div className={style["booking-info"]}>
            <h1>
              <b>Booking Information</b>
            </h1>
            <hr />
            <div>
              <div>
                <h3>
                  <b>Contact</b>
                </h3>
                <div className={style["contact-info"]}>
                  <div className={style["input-container"]}>
                    <div className="mb-3">
                      <p>Full Name: </p>
                      <input
                        type="text"
                        className="form-control border-secondary"
                        name="name"
                        value={contactInfo.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <p>Phone Number: </p>
                      <input
                        type="text"
                        className="form-control border-secondary"
                        name="phoneNumber"
                        value={contactInfo.phoneNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className={style["input-container"]}>
                    <div className="mb-3">
                      <p>Date Of Birth: </p>
                      <input
                        type="date"
                        className="form-control border-secondary"
                        name="dateOfBirth"
                        value={contactInfo.dateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <p>Email: </p>
                      <input
                        type="email"
                        className="form-control border-secondary"
                        name="email"
                        value={contactInfo.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3>
                  <b>Reservation</b>
                </h3>
                <div className={style["reservation"]}>
                  <div className={`${style["input-container"]} mb-3`}>
                    <label>
                      {" "}
                      <FaPerson className="me-2" /> Adult:{" "}
                    </label>
                    <div className={style["input-box"]}>
                      <button
                        className={`btn btn-danger btn-sm ${style["button-style"]}`}
                        type="button"
                        name="minus"
                        onClick={handleAdultSeat}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control border-secondary mx-2"
                        name="adultSeat"
                        value={reservation.adultSeat}
                      />
                      <button
                        className={`btn btn-success btn-sm ${style["button-style"]}`}
                        type="button"
                        name="plus"
                        onClick={handleAdultSeat}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={`${style["input-container"]} mb-3`}>
                    <label>
                      {" "}
                      <FaChild className="me-2" /> Children:{" "}
                    </label>
                    <div className={style["input-box"]}>
                      <button
                        className={`btn btn-danger btn-sm ${style["button-style"]}`}
                        type="button"
                        name="minus"
                        onClick={handleChildrenSeat}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control border-secondary mx-2"
                        name="childrenSeat"
                        value={reservation.childrenSeat}
                      />
                      <button
                        className={`btn btn-success btn-sm ${style["button-style"]}`}
                        type="button"
                        name="plus"
                        onClick={handleChildrenSeat}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className={`${style["input-container"]} mb-3`}>
                    <label>
                      <FaBaby className="me-2" /> Baby:{" "}
                    </label>
                    <div className={style["input-box"]}>
                      <button
                        className={`btn btn-danger btn-sm ${style["button-style"]}`}
                        type="button"
                        name="minus"
                        onClick={handleBabySeat}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="form-control border-secondary mx-2"
                        name="babySeat"
                        value={reservation.babySeat}
                      />
                      <button
                        className={`btn btn-success btn-sm ${style["button-style"]}`}
                        type="button"
                        name="plus"
                        onClick={handleBabySeat}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                    <small>{selectedFlight.departureAirport}</small> <br />
                    <b style={{ fontSize: "12px", color: "green" }}>
                      {getDate(selectedFlight.departureDate)} |{" "}
                      {getTime(selectedFlight.departureDate)}
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
                        selectedFlight.departureDate,
                        selectedFlight.arrivalDate
                      )}
                    </p>
                  </div>
                  <div className="text-center">
                    <b>{selectedFlight.destinationCity}</b> <br />
                    <small>{selectedFlight.destinationAirport}</small> <br />
                    <b style={{ fontSize: "12px", color: "green" }}>
                      {getDate(selectedFlight.arrivalDate)} |{" "}
                      {getTime(selectedFlight.arrivalDate)}
                    </b>
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
              <div className="p-3">
                <div className={style["price-info"]}>
                  <b>Base Price: </b>
                  <p>{selectedFlight.price?.toLocaleString("vi-VN")} VNĐ</p>
                </div>
                <div className={style["price-info"]}>
                  <b>Adult Price ({reservation.adultSeat}): </b>
                  <p>
                    {(
                      selectedFlight.adultPrice * reservation.adultSeat
                    ).toLocaleString("vi-VN")}{" "}
                    VNĐ
                  </p>
                </div>
                {reservation.childrenSeat > 0 && (
                  <div className={style["price-info"]}>
                    <b>Children Price ({reservation.childrenSeat}): </b>
                    <p>
                      {(
                        selectedFlight.childrenPrice * reservation.childrenSeat
                      ).toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </p>
                  </div>
                )}
                {reservation.babySeat > 0 && (
                  <div className={style["price-info"]}>
                    <b>Baby Price ({reservation.babySeat}): </b>
                    <p>
                      {(
                        selectedFlight.babyPrice * reservation.babySeat
                      ).toLocaleString("vi-VN")}{" "}
                      VNĐ
                    </p>
                  </div>
                )}
                <hr />
                <div className={`${style["price-info"]} text-danger`}>
                  <b>Total: </b>
                  <b>{reservation.totalPrice?.toLocaleString("vi-VN")} VNĐ</b>
                </div>
              </div>
              <div className="mt-4 text-end">
                <button type="submit" className="btn btn-lg btn-success">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
