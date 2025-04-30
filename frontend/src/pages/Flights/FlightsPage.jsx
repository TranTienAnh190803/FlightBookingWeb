import Navbar from "../../components/Navbar";
import style from "./FlightsPage.module.css";
import plane from "../../assets/plane1.jpg";
import {
  FaCalendar,
  FaPlane,
  FaPlaneArrival,
  FaPlaneDeparture,
} from "react-icons/fa";
import { useRef } from "react";

export default function FlightsPage() {
  const departureRef = useRef(null);
  const returnRef = useRef(null);

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
            <h3>
              <b>Filter</b>
            </h3>
            <hr />
            <form>
              <div className={style["search-input"]}>
                <div>
                  <div>
                    <input type="checkbox" /> Round-trip
                  </div>
                  <div className={style["input-city"]}>
                    <div>
                      <p>From</p>
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
                      <p>To</p>
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
                      <p>Departure Date</p>
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
                      <p>Return Date</p>
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
                  <p>Airline</p>
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
      </div>
    </div>
  );
}
