import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import style from "./AdminFlightDetail.module.css";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import FlightService from "../../services/FlightService";
import Footer from "../../components/Footer";

export default function AdminFlightDetail() {
  const { flightId } = useParams("flightId");
  const [flightName, setFlightName] = useState("");
  const [flight, setFlight] = useState({});

  const fetchSelectedFlight = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await FlightService.getSelectedFlight(token, flightId);
      if (response.statusCode === 200) {
        setFlight(response.flight);
        setFlightName(response.flight.flightName);
      } else {
        alert(response.message);
      }
    }
  };

  useEffect(() => {
    fetchSelectedFlight();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["flight-detail"]}>
          <h1>
            <b>
              Flight Detail:{" "}
              <span style={{ color: "blue" }}> {flightName} </span>
            </b>
          </h1>
          <hr />
          <form>
            <div className={`${style["input-container"]} p-3`}>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Flight ID: </b>
                  </p>
                  <input
                    type="text"
                    name="flightId"
                    className="form-control border border-secondary"
                    value={flightId}
                    disabled
                    readOnly
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Flight Name: </b>
                  </p>
                  <input
                    type="text"
                    name="flightName"
                    className="form-control border border-secondary"
                    value={flight.flightName}
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
                    name="destinationeCity"
                    className="form-control border border-secondary"
                    value={flight.destinationCity}
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
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div
                  className={style["input-group"]}
                  style={{ alignSelf: "center", flexBasis: "calc(80% / 3)" }}
                >
                  <input
                    type="checkbox"
                    name="roundTrip"
                    className="form-check-input border border-secondary"
                    checked={flight.roundTrip}
                  />
                  <span>
                    <b> Round Trip </b>
                  </span>
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
                    <span id="remainHelpInline" class="form-text">
                      ( Remain Seat: {flight.remain} )
                    </span>
                  </p>
                  <input
                    type="number"
                    name="capacity"
                    className="form-control border border-secondary"
                    aria-describedby="remainHelpInline"
                    value={flight.capacity}
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
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Base Price: </b> <span class="form-text">( VNĐ )</span>
                  </p>
                  <input
                    type="number"
                    name="price"
                    className="form-control border border-secondary"
                    value={flight.price}
                    required
                  />
                </div>
              </div>
              <div className={style["input-box"]}>
                <div className={style["input-group"]}>
                  <p>
                    <b>Adult Price: </b> <span class="form-text">( VNĐ )</span>
                  </p>
                  <input
                    type="number"
                    name="adultPrice"
                    className="form-control border border-secondary"
                    value={flight.adultPrice}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Children Price: </b>{" "}
                    <span class="form-text">( VNĐ )</span>
                  </p>
                  <input
                    type="number"
                    name="childrenPrice"
                    className="form-control border border-secondary"
                    value={flight.childrenPrice}
                    required
                  />
                </div>
                <div className={style["input-group"]}>
                  <p>
                    <b>Baby Price: </b> <span class="form-text">( VNĐ )</span>
                  </p>
                  <input
                    type="number"
                    name="babyPrice"
                    className="form-control border border-secondary"
                    value={flight.babyPrice}
                    required
                  />
                </div>
              </div>
            </div>
            <div className={style["button-group"]}>
              <button
                className="btn btn-danger btn-lg mx-3"
                type="submit"
                value="delete"
              >
                Delete
              </button>
              <button
                className="btn btn-warning btn-lg mx-3 px-4"
                type="submit"
                value="update"
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
