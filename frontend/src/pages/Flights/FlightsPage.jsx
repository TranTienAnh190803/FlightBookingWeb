import Navbar from "../../components/Navbar";
import style from "./FlightsPage.module.css";
import plane from "../../assets/plane1.jpg";
import {
  FaCalendar,
  FaPlane,
  FaPlaneArrival,
  FaPlaneDeparture,
} from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import UserService from "../../services/UserService";
import FlightService from "../../services/FlightService";
import FlightCard from "../../components/FlightCard";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

export default function FlightsPage() {
  const departureRef = useRef(null);
  const returnRef = useRef(null);
  const [flightList, setFlightList] = useState([]);
  const [noFlight, setNoFlight] = useState(false);
  const [message, setMessage] = useState("");

  const handleDepartureDate = () => {
    if (departureRef.current) {
      departureRef.current.showPicker?.();
    }
  };

  const handleReturnDate = () => {
    if (returnRef.current) {
      returnRef.current.showPicker?.();
    }
  };

  const fetchFlightList = async () => {
    const flights = await FlightService.getAllFlight();
    if (flights.statusCode === 200) {
      setFlightList(flights.flightList);
    } else {
      setNoFlight(true);
      setMessage(flights.message);
    }
  };

  useEffect(() => {
    fetchFlightList();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div
          className={style["search-container"]}
          style={{
            backgroundImage: `url(${plane})`,
          }}
        >
          <div className={style["search-box"]}>
            <h1>
              <b>Filter</b>
            </h1>
            <hr />
            <form>
              <div className={style["search-input"]}>
                <div>
                  <div>
                    <label>
                      <input
                        className="form-check-input border border-secondary"
                        type="checkbox"
                      />
                      <b className="mx-2">Round-trip</b>
                    </label>
                  </div>
                  <div className={style["input-city"]}>
                    <div>
                      <p>
                        <b>From</b>
                      </p>
                      <div className={style["input-box"]}>
                        <input
                          type="text"
                          name="departureCity"
                          placeholder="Departure City"
                        />
                        <FaPlaneDeparture className={style["icon"]} />
                      </div>
                    </div>
                    <div>
                      <p>
                        <b>To</b>
                      </p>
                      <div className={style["input-box"]}>
                        <input
                          type="text"
                          name="destinationCity"
                          placeholder="Destination City"
                        />
                        <FaPlaneArrival className={style["icon"]} />
                      </div>
                    </div>
                  </div>
                  <div className={style["input-date"]}>
                    <div>
                      <p>
                        <b>Departure Date</b>
                      </p>
                      <div className={style["input-box"]}>
                        <input
                          type="date"
                          name="departureCity"
                          ref={departureRef}
                        />
                        <FaCalendar
                          className={style["icon"]}
                          onClick={handleDepartureDate}
                        />
                      </div>
                    </div>
                    <div>
                      <p>
                        <b>Return Date</b>
                      </p>
                      <div className={style["input-box"]}>
                        <input
                          type="date"
                          name="destinationCity"
                          ref={returnRef}
                        />
                        <FaCalendar
                          className={style["icon"]}
                          onClick={handleReturnDate}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "54px" }}>
                  <p>
                    <b>Airline</b>
                  </p>
                  <div className={style["input-box"]}>
                    <input
                      type="text"
                      name="airline"
                      placeholder="Your favorite airline"
                    />
                    <FaPlane className={style["icon"]} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: "30px", textAlign: "center" }}>
                <button className="btn btn-success">Search Flights</button>
              </div>
            </form>
          </div>
        </div>
        <div className={style["flights-container"]}>
          <div className={style["flights-list"]}>
            <h1>
              <b>Flights</b>
            </h1>
            <hr style={{ marginBottom: "50px" }} />
            {noFlight && (
              <center>
                <h3>{message}</h3>
              </center>
            )}
            <Link className={style["flights"]} to={"/"}>
              {flightList.map((flight, index) => {
                return (
                  <div className={style["flight"]} key={index}>
                    <FlightCard
                      airline={flight.airline}
                      flightName={flight.flightName}
                      departureDate={flight.departureDate}
                      roundTrip={flight.roundTrip}
                      returnDate={flight.returnDate}
                      price={flight.price}
                      className={style["flight-card"]}
                    />
                  </div>
                );
              })}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
