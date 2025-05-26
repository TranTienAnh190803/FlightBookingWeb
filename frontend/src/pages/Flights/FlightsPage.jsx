import Navbar from "../../components/Navbar";
import style from "./FlightsPage.module.css";
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
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

export default function FlightsPage() {
  const departureRef = useRef(null);
  const returnRef = useRef(null);
  const [flightList, setFlightList] = useState([]);
  const [noFlight, setNoFlight] = useState(false);
  const [message, setMessage] = useState("");
  const [searchInfo, setSearchInfo] = useState({
    roundTrip: false,
    departureCity: "",
    destinationCity: "",
    departureDate: null,
    returnDate: null,
  });

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

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSearchInfo({ ...searchInfo, [name]: value });
  };

  const handleRoundTrip = (e) => {
    const name = e.target.name;
    const check = e.target.checked;
    if (check) {
      setSearchInfo({ ...searchInfo, [name]: check });
    } else {
      setSearchInfo({ ...searchInfo, [name]: check, returnDate: null });
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await FlightService.searchFlight(token, searchInfo);
      if (response.statusCode === 200) {
        setFlightList(response.flightList);
      } else {
        setFlightList([]);
        setNoFlight(true);
        setMessage(response.message);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["search-container"]}>
          <div className={`${style["search-box"]} shadow`}>
            <h1>
              <b>Filter</b>
            </h1>
            <hr />
            <form onSubmit={handleSearch}>
              <div className={style["search-input"]}>
                <div>
                  <div>
                    <label>
                      <input
                        className="form-check-input border border-secondary"
                        type="checkbox"
                        name="roundTrip"
                        checked={searchInfo.roundTrip}
                        onChange={handleRoundTrip}
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
                          value={searchInfo.departureCity}
                          onChange={handleInputChange}
                          required
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
                          value={searchInfo.destinationCity}
                          onChange={handleInputChange}
                          required
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
                          name="departureDate"
                          ref={departureRef}
                          value={searchInfo.departureDate}
                          onChange={handleInputChange}
                          required
                        />
                        <FaCalendar
                          className={style["icon"]}
                          onClick={handleDepartureDate}
                        />
                      </div>
                    </div>
                    {searchInfo.roundTrip && (
                      <div>
                        <p>
                          <b>Return Date</b>
                        </p>
                        <div className={style["input-box"]}>
                          <input
                            type="date"
                            name="returnDate"
                            ref={returnRef}
                            value={searchInfo.returnDate}
                            onChange={handleInputChange}
                            required={searchInfo.roundTrip}
                          />
                          <FaCalendar
                            className={style["icon"]}
                            onClick={handleReturnDate}
                          />
                        </div>
                      </div>
                    )}
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
          <div className={`${style["flights-list"]} shadow`}>
            <h1>
              <b>Flights</b>
            </h1>
            <hr style={{ marginBottom: "50px" }} />
            {noFlight && (
              <center>
                <h3 className="text-danger">
                  <b>{message}</b>
                </h3>
              </center>
            )}

            <div className={style["flights"]}>
              {flightList.map((flight) => {
                return (
                  <Link
                    className={style["flight"]}
                    to={`${
                      UserService.isUser()
                        ? `/user/book-ticket/${flight.flightId}`
                        : "/login"
                    }`}
                    key={flight.flightId}
                  >
                    <FlightCard
                      airline={flight.airline}
                      flightName={flight.flightName}
                      departureDate={flight.departureDate}
                      roundTrip={flight.roundTrip}
                      returnDate={flight.returnDate}
                      remain={flight.remain}
                      price={flight.price}
                      className={style["flight-card"]}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
