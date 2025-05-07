import { useState } from "react";
import style from "./AdminAddFlightPage.module.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UserService from "../../services/UserService";
import FlightService from "../../services/FlightService";
import { useNavigate } from "react-router-dom";

export default function AdminAddFlightPage() {
  const navigate = useNavigate();
  const [flight, setFlight] = useState({
    flightName: "",
    airline: "",
    departureAirport: "",
    departureCity: "",
    departureDate: null,
    destinationAirport: "",
    destinationCity: "",
    arrivalDate: null,
    capacity: 0,
    planeType: "",
    price: 0,
    adultPrice: 0,
    childrenPrice: 0,
    babyPrice: 0,
    roundTrip: false,
    returnDate: null,
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFlight({ ...flight, [name]: value });
  };

  const handleRoundTrip = (e) => {
    const name = e.target.value;
    const check = e.target.checked;
    if (check) {
      setFlight({ ...flight, [name]: check });
    } else {
      setFlight({
        ...flight,
        [name]: check,
        returnDate: null,
      });
    }
  };

  const handleFlightCapacity = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFlight({ ...flight, [name]: value, remain: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await FlightService.addFlight(token, flight);
      if (response.statusCode === 200) {
        alert(response.message);
        navigate("/admin/flight-management");
      } else {
        alert(response.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["flight-detail"]}>
          <h1>
            <b>Add Flight</b>
          </h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div className={`${style["input-container"]} p-3`}>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Flight Name: </b>
                  </p>
                  <input
                    type="text"
                    name="flightName"
                    className="form-control border border-secondary"
                    value={flight.flightName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Airline: </b>
                  </p>
                  <input
                    type="text"
                    name="airline"
                    className="form-control border border-secondary"
                    value={flight.airline}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Departure City: </b>
                  </p>
                  <input
                    type="text"
                    name="departureCity"
                    className="form-control border border-secondary"
                    value={flight.departureCity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Departure Airport: </b>
                  </p>
                  <input
                    type="text"
                    name="departureAirport"
                    className="form-control border border-secondary"
                    value={flight.departureAirport}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Departure Date: </b>
                  </p>
                  <input
                    type="datetime-local"
                    name="departureDate"
                    className="form-control border border-secondary"
                    value={flight.departureDate?.slice(0, 16)}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Destination City: </b>
                  </p>
                  <input
                    type="text"
                    name="destinationCity"
                    className="form-control border border-secondary"
                    value={flight.destinationCity}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Destination Airport: </b>
                  </p>
                  <input
                    type="text"
                    name="destinationAirport"
                    className="form-control border border-secondary"
                    value={flight.destinationAirport}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Arrival Date: </b>
                  </p>
                  <input
                    type="datetime-local"
                    name="arrivalDate"
                    className="form-control border border-secondary"
                    value={flight.arrivalDate?.slice(0, 16)}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div
                  className={style["input-group"]}
                  style={{ alignSelf: "center", flexBasis: "calc(80% / 3)" }}
                >
                  <label>
                    <input
                      type="checkbox"
                      value="roundTrip"
                      className="form-check-input border border-secondary"
                      onChange={handleRoundTrip}
                    />
                    <span className="mx-1">
                      <b> Round Trip </b>
                    </span>
                  </label>
                </div>
                <div
                  className={style["input-group"]}
                  style={{ flexBasis: "calc(80% / 3)" }}
                >
                  <p>
                    <b>Return Date: </b>
                  </p>
                  <input
                    type="datetime-local"
                    name="returnDate"
                    className="form-control border border-secondary"
                    value={flight.returnDate?.slice(0, 16)}
                    onChange={handleInputChange}
                    required={flight.roundTrip}
                    disabled={!flight.roundTrip}
                    readOnly={!flight.roundTrip}
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Capacity: </b>{" "}
                    <span id="remainHelpInline" className="form-text">
                      ( Remain Seat: {flight.remain} )
                    </span>
                  </p>
                  <input
                    type="number"
                    name="capacity"
                    className="form-control border border-secondary"
                    aria-describedby="remainHelpInline"
                    value={flight.capacity}
                    onChange={handleFlightCapacity}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Plane Type: </b>
                  </p>
                  <input
                    type="text"
                    name="planeType"
                    className="form-control border border-secondary"
                    value={flight.planeType}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Base Price: </b>{" "}
                    <span className="form-text">( VNĐ )</span>
                  </p>
                  <input
                    type="number"
                    name="price"
                    className="form-control border border-secondary"
                    value={flight.price}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Adult Price: </b>{" "}
                    <span className="form-text">( VNĐ )</span>
                  </p>
                  <input
                    type="number"
                    name="adultPrice"
                    className="form-control border border-secondary"
                    value={flight.adultPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Children Price: </b>{" "}
                    <span className="form-text">( VNĐ )</span>
                  </p>
                  <input
                    type="number"
                    name="childrenPrice"
                    className="form-control border border-secondary"
                    value={flight.childrenPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Baby Price: </b>{" "}
                    <span className="form-text">( VNĐ )</span>
                  </p>
                  <input
                    type="number"
                    name="babyPrice"
                    className="form-control border border-secondary"
                    value={flight.babyPrice}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className={style["button-group"]}>
              <button
                className="btn btn-success btn-lg mx-3 px-4"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
