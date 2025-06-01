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
  // Parameter
  const { flightId } = useParams("flightId");
  const navigate = useNavigate();
  const [selectedFlight, setSelectedFlight] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [position, setPosition] = useState([
    {
      index: 0,
      category: "Adult",
    },
  ]);
  const [reservation, setReservation] = useState({
    adultSeat: 1,
    childrenSeat: 0,
    babySeat: 0,
    clientInfoList: Array.from({ length: 7 }).fill(null),
  });
  const [totalSeat, setTotalSeat] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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
    document.title = "Ticket Booking";
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

  const getAge = (date1) => {
    const date = new Date(date1).getTime();
    const now = Date.now();

    const ageInMs = now - date;
    const msInYear = 365.25 * 24 * 60 * 60 * 1000;
    const age = ageInMs / msInYear;

    return age;
  };

  // handle function
  const handleContactInfoChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleClientInfoChange = (index, category, name, value) => {
    for (let i in reservation.clientInfoList) {
      if (Number(i) === index) {
        const updateClientInfoList = [...reservation.clientInfoList];
        updateClientInfoList[i] = {
          ...updateClientInfoList[i],
          [name]: value,
          ageCategory: category,
        };

        setReservation({
          ...reservation,
          clientInfoList: updateClientInfoList,
        });
      }
    }
  };

  const handleAdultSeat = (e) => {
    const name = e.target.name;
    const adult = reservation.adultSeat;
    const adultPrice = selectedFlight.adultPrice;
    const total = reservation.totalPrice;
    const newPosition = [...position];

    if (name === "minus") {
      if (adult > 1) {
        setTotalSeat(totalSeat - 1);
        for (let i = position.length - 1; i >= 0; i--) {
          if (position[i].category === "Adult") {
            const positionUpdate = newPosition.filter(
              (value, index) => index !== i
            );
            const positionDelete = newPosition.filter(
              (value, index) => index === i
            );
            const updateClientInfoList = reservation.clientInfoList.map(
              (value, index) =>
                index === positionDelete[0]?.index ? null : value
            );

            setPosition(positionUpdate);
            setReservation({
              ...reservation,
              adultSeat: adult - 1,
              totalPrice: total - adultPrice,
              clientInfoList: updateClientInfoList,
            });
            break;
          }
        }
      }
    } else if (name === "plus") {
      setTotalSeat(totalSeat + 1);
      setReservation({
        ...reservation,
        adultSeat: adult + 1,
        totalPrice: total + adultPrice,
      });
      for (let i = 0; i < reservation.clientInfoList.length; i++) {
        const existSlot = newPosition.some((value) => value.index === i);
        if (!existSlot) {
          newPosition.push({ index: i, category: "Adult" });
          setPosition(newPosition);
          break;
        }
      }
    }
  };

  const handleChildrenSeat = (e) => {
    const name = e.target.name;
    const children = reservation.childrenSeat;
    const childrenPrice = selectedFlight.childrenPrice;
    const total = reservation.totalPrice;
    const newPosition = [...position];

    if (name === "minus") {
      if (children > 0) {
        setTotalSeat(totalSeat - 1);
        for (let i = position.length - 1; i >= 0; i--) {
          if (position[i].category === "Children") {
            const positionUpdate = newPosition.filter(
              (value, index) => index !== i
            );
            const positionDelete = newPosition.filter(
              (value, index) => index === i
            );
            const updateClientInfoList = reservation.clientInfoList.map(
              (value, index) =>
                index === positionDelete[0]?.index ? null : value
            );

            setPosition(positionUpdate);
            setReservation({
              ...reservation,
              childrenSeat: children - 1,
              totalPrice: total - childrenPrice,
              clientInfoList: updateClientInfoList,
            });
            break;
          }
        }
      }
    } else if (name === "plus") {
      setTotalSeat(totalSeat + 1);
      setReservation({
        ...reservation,
        childrenSeat: children + 1,
        totalPrice: total + childrenPrice,
      });
      for (let i = 0; i < reservation.clientInfoList.length; i++) {
        const existSlot = newPosition.some((value) => value.index === i);
        if (!existSlot) {
          newPosition.push({ index: i, category: "Children" });
          setPosition(newPosition);
          break;
        }
      }
    }
  };

  const handleBabySeat = (e) => {
    const name = e.target.name;
    const baby = reservation.babySeat;
    const babyPrice = selectedFlight.babyPrice;
    const total = reservation.totalPrice;
    const newPosition = [...position];

    if (name === "minus") {
      if (baby > 0) {
        setTotalSeat(totalSeat - 1);
        for (let i = position.length - 1; i >= 0; i--) {
          if (position[i].category === "Baby") {
            const positionUpdate = newPosition.filter(
              (value, index) => index !== i
            );
            const positionDelete = newPosition.filter(
              (value, index) => index === i
            );
            const updateClientInfoList = reservation.clientInfoList.map(
              (value, index) =>
                index === positionDelete[0]?.index ? null : value
            );

            setPosition(positionUpdate);
            setReservation({
              ...reservation,
              babySeat: baby - 1,
              totalPrice: total - babyPrice,
              clientInfoList: updateClientInfoList,
            });
            break;
          }
        }
      }
    } else if (name === "plus") {
      setTotalSeat(totalSeat + 1);
      setReservation({
        ...reservation,
        babySeat: baby + 1,
        totalPrice: total + babyPrice,
      });
      for (let i = 0; i < reservation.clientInfoList.length; i++) {
        const existSlot = newPosition.some((value) => value.index === i);
        if (!existSlot) {
          newPosition.push({ index: i, category: "Baby" });
          setPosition(newPosition);
          break;
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAuthenticated()) {
      setIsLoading(true);
      let execute = true;

      const clientList = reservation.clientInfoList;
      for (let value of clientList) {
        if (value === null) {
          continue;
        }
        if (value.ageCategory === "Adult" && getAge(value.dateOfBirth) < 18) {
          execute = false;
        } else if (
          value.ageCategory === "Children" &&
          (getAge(value.dateOfBirth) >= 18 || getAge(value.dateOfBirth) <= 4)
        ) {
          console.log(getAge(value.dateOfBirth));
          execute = false;
        } else if (
          value.ageCategory === "Baby" &&
          getAge(value.dateOfBirth) > 4
        ) {
          execute = false;
        }
      }

      if (execute) {
        const token = localStorage.getItem("token");
        const response = await FlightTicketService.bookingFlight(
          token,
          flightId,
          reservation
        );
        if (response.statusCode === 200) {
          alert(response.message);
          navigate("/flights");
        } else {
          alert(response.message);
        }
      } else {
        alert(
          "Please check your date of birth information again.\n- Adult: 18 years of age or older.\n- Children: Under 18 years old and over 3 years old\n- Baby: Under 3 years old"
        );
      }

      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      {/* Main */}
      <div className={style["wrapper"]}>
        <form className={style["booking"]} onSubmit={handleSubmit}>
          <div className={style["booking-info"]}>
            {/* Booking Information Desk */}
            <div className={style["contact-reservation"]}>
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
                          onChange={handleContactInfoChange}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <p>Phone Number: </p>
                        <input
                          type="text"
                          className="form-control border-secondary"
                          name="phoneNumber"
                          value={contactInfo.phoneNumber}
                          onChange={handleContactInfoChange}
                          readOnly
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
                          onChange={handleContactInfoChange}
                          readOnly
                        />
                      </div>
                      <div className="mb-3">
                        <p>Email: </p>
                        <input
                          type="email"
                          className="form-control border-secondary"
                          name="email"
                          value={contactInfo.email}
                          onChange={handleContactInfoChange}
                          readOnly
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
                          readOnly
                        />
                        <button
                          className={`btn btn-success btn-sm ${style["button-style"]}`}
                          type="button"
                          name="plus"
                          disabled={totalSeat >= 7}
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
                          readOnly
                        />
                        <button
                          className={`btn btn-success btn-sm ${style["button-style"]}`}
                          type="button"
                          name="plus"
                          disabled={totalSeat >= 7}
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
                          readOnly
                        />
                        <button
                          className={`btn btn-success btn-sm ${style["button-style"]}`}
                          type="button"
                          name="plus"
                          disabled={totalSeat >= 7}
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

            {/* Client Information Desk */}
            {/* Adult */}
            {reservation.adultSeat > 0 && (
              <div className={`${style["client-info"]} my-3`}>
                <h1>
                  <b>
                    <FaPerson className="mb-3" /> Adult
                  </b>
                </h1>
                <hr />
                {position
                  .filter((value) => value.category === "Adult")
                  .map((value, index) => {
                    return (
                      <div className={style["client-form"]} key={index}>
                        {index > 0 && <hr />}
                        <h3 className="mb-4">
                          <b>Adult {index + 1}</b>
                        </h3>
                        <div className={style["input-container"]}>
                          <div className={style["input-box"]}>
                            <p>First Name: </p>
                            <input
                              type="text"
                              className="form-control border-secondary"
                              name="firstName"
                              value={
                                reservation.clientInfoList[value.index]
                                  ?.firstName
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className={style["input-box"]}>
                            <p>Last Name: </p>
                            <input
                              type="text"
                              className="form-control border-secondary"
                              name="lastName"
                              value={
                                reservation.clientInfoList[value.index]
                                  ?.lastName
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className={style["input-container"]}>
                          <div className={style["input-box"]}>
                            <p>Date Of Birth: </p>
                            <input
                              type="date"
                              className="form-control border-secondary"
                              name="dateOfBirth"
                              value={
                                reservation.clientInfoList[value.index]
                                  ?.dateOfBirth
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className={style["input-box"]}>
                            <p>Gender: </p>
                            <select
                              name="gender"
                              className="form-select border-secondary"
                              value={
                                reservation.clientInfoList[value.index]?.gender
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option
                                value=""
                                selected
                                disabled
                                hidden
                              ></option>
                              <option value="true">Male</option>
                              <option value="false">Female</option>
                            </select>
                          </div>
                        </div>
                        <div className={style["input-box"]}>
                          <p>Passport/Identification: </p>
                          <input
                            type="text"
                            className="form-control border-secondary"
                            name="passport"
                            value={
                              reservation.clientInfoList[value.index]?.passport
                            }
                            onChange={(e) =>
                              handleClientInfoChange(
                                value.index,
                                value.category,
                                e.target.name,
                                e.target.value
                              )
                            }
                            required
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
            {/* Children */}
            {reservation.childrenSeat > 0 && (
              <div className={`${style["client-info"]} my-3`}>
                <h1>
                  <b>
                    <FaChild className="mb-3" /> Children
                  </b>
                </h1>
                <hr />
                {position
                  .filter((value) => value.category === "Children")
                  .map((value, index) => {
                    return (
                      <div className={style["client-form"]} key={index}>
                        {index > 0 && <hr />}
                        <h3 className="mb-4">
                          <b>Children {index + 1}</b>
                        </h3>
                        <div className={style["input-container"]}>
                          <div className={style["input-box"]}>
                            <p>First Name: </p>
                            <input
                              type="text"
                              className="form-control border-secondary"
                              name="firstName"
                              value={
                                reservation.clientInfoList[value.index]
                                  ?.firstName
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className={style["input-box"]}>
                            <p>Last Name: </p>
                            <input
                              type="text"
                              className="form-control border-secondary"
                              name="lastName"
                              value={
                                reservation.clientInfoList[value.index]
                                  ?.lastName
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className={style["input-container"]}>
                          <div className={style["input-box"]}>
                            <p>Date Of Birth: </p>
                            <input
                              type="date"
                              className="form-control border-secondary"
                              name="dateOfBirth"
                              value={
                                reservation.clientInfoList[value.index]
                                  ?.dateOfBirth
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className={style["input-box"]}>
                            <p>Gender: </p>
                            <select
                              name="gender"
                              className="form-select border-secondary"
                              value={
                                reservation.clientInfoList[value.index]?.gender
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option
                                value=""
                                selected
                                disabled
                                hidden
                              ></option>
                              <option value="true">Male</option>
                              <option value="false">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* Baby */}
            {reservation.babySeat > 0 && (
              <div className={`${style["client-info"]} my-3`}>
                <h1>
                  <b>
                    <FaBaby className="mb-3" /> Baby
                  </b>
                </h1>
                <hr />
                {position
                  .filter((value) => value.category === "Baby")
                  .map((value, index) => {
                    return (
                      <div className={style["client-form"]} key={index}>
                        {index > 0 && <hr />}
                        <h3 className="mb-4">
                          <b>Baby {index + 1}</b>
                        </h3>
                        <div className={style["input-container"]}>
                          <div className={style["input-box"]}>
                            <p>First Name: </p>
                            <input
                              type="text"
                              className="form-control border-secondary"
                              name="firstName"
                              value={
                                reservation.clientInfoList[value.index]
                                  ?.firstName
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className={style["input-box"]}>
                            <p>Last Name: </p>
                            <input
                              type="text"
                              className="form-control border-secondary"
                              name="lastName"
                              value={
                                reservation.clientInfoList[value.index]
                                  ?.lastName
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className={style["input-container"]}>
                          <div className={style["input-box"]}>
                            <p>Date Of Birth: </p>
                            <input
                              type="date"
                              className="form-control border-secondary"
                              name="dateOfBirth"
                              value={
                                reservation.clientInfoList[value.index]
                                  ?.dateOfBirth
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div className={style["input-box"]}>
                            <p>Gender: </p>
                            <select
                              name="gender"
                              className="form-select border-secondary"
                              value={
                                reservation.clientInfoList[value.index]?.gender
                              }
                              onChange={(e) =>
                                handleClientInfoChange(
                                  value.index,
                                  value.category,
                                  e.target.name,
                                  e.target.value
                                )
                              }
                              required
                            >
                              <option
                                value=""
                                selected
                                disabled
                                hidden
                              ></option>
                              <option value="true">Male</option>
                              <option value="false">Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Flight Information Desk */}
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
                    <b>Capacity: </b> {selectedFlight.capacity}
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
                      {selectedFlight.remain}{" "}
                      {selectedFlight.remain === 0 && "(Full)"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Price And Payment Desk */}
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
                <button
                  type="submit"
                  className="btn btn-lg btn-success"
                  disabled={isLoading}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
