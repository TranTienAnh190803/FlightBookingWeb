import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import style from "./AdminFlightDetailPage.module.css";
import UserService from "../../services/UserService";
import { useEffect, useState } from "react";
import FlightService from "../../services/FlightService";
import Footer from "../../components/Footer";

export default function AdminFlightDetailPage() {
  const { flightId } = useParams("flightId");
  const navigate = useNavigate();
  const [flightName, setFlightName] = useState("");
  const [flight, setFlight] = useState({});
  const [excess, setExcess] = useState({
    oldCapacity: 0,
    oldRemain: 0,
  });

  const fetchSelectedFlight = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await FlightService.getSelectedFlight(token, flightId);
      if (response.statusCode === 200) {
        setFlight(response.flight);
        setFlightName(response.flight.flightName);
        setExcess({
          oldCapacity: response.flight.capacity,
          oldRemain: response.flight.remain,
        });
      } else {
        alert(response.message);
      }
    }
  };

  useEffect(() => {
    fetchSelectedFlight();
  }, []);

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
    const newCapacity = Number(e.target.value);
    let newRemain;

    if (newCapacity > excess.oldCapacity) {
      newRemain = excess.oldRemain + (newCapacity - excess.oldCapacity);
    } else {
      newRemain = excess.oldRemain - (excess.oldCapacity - newCapacity);
    }

    setFlight({ ...flight, [name]: newCapacity, remain: newRemain });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const submitter = e.nativeEvent.submitter;
      const action = submitter.name;

      if (action === "delete") {
        const response = await FlightService.deleteFlight(token, flightId);
        if (response.statusCode === 200) {
          alert(response.message);
          navigate("/admin/flight-management");
        } else {
          alert(response.message);
        }
      } else if (action === "update") {
        console.log("update");
      }
    }
  };

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
          <form onSubmit={handleSubmit}>
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
                    <span
                      id="remainHelpInline"
                      className={`form-text ${
                        flight.remain < 0 && "text-danger"
                      }`}
                    >
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
                className="btn btn-danger btn-lg mx-3"
                type="submit"
                name="delete"
              >
                Delete
              </button>
              <button
                className="btn btn-warning btn-lg mx-3 px-4"
                type="submit"
                name="update"
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
