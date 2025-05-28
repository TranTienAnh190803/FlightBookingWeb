import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UserService from "../../services/UserService";
import style from "./FlightManagementPage.module.css";
import FlightService from "../../services/FlightService";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

export default function FlightManagementPage() {
  const [flightList, setFlightList] = useState([]);
  const [message, setMessage] = useState("");
  const [noFlight, setNoFlight] = useState(false);

  const fetchFlightList = async () => {
    if (UserService.isAdmin()) {
      const flights = await FlightService.getAllFlight();
      if (flights.statusCode === 200) {
        setFlightList(flights.flightList);
      } else {
        setMessage(flights.message);
        setNoFlight(true);
      }
    }
  };

  useEffect(() => {
    document.title = "Flight Management";
    fetchFlightList();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["flight-list"]}>
          <h1>
            <b>Flights List</b>
          </h1>
          <hr />
          <div style={{ margin: "20px 0px 10px 0px", textAlign: "end" }}>
            <Link className="btn btn-success btn-lg" to={"/admin/add-flight"}>
              Add Flight
            </Link>
          </div>
          {noFlight ? (
            <center className="my-5">
              <h3>{message}</h3>
            </center>
          ) : (
            <div>
              <div style={{ overflowX: "auto" }}>
                <table className="table table-striped table-hover text-center">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Departure City</th>
                      <th scope="col">Departure Time</th>
                      <th scope="col">Destination City</th>
                      <th scope="col">Arrival Time</th>
                      <th scope="col">Round-trip</th>
                      <th scope="col">Capacity</th>
                      <th scope="col">Remain</th>
                      <th scope="col">Base Price(VNĐ)</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {flightList.map((flight, index) => {
                      const dptDate = new Date(flight.departureDate);
                      const dyyyy = dptDate.getFullYear();
                      const dMM = String(dptDate.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const ddd = String(dptDate.getDate()).padStart(2, "0");
                      const dhh = String(dptDate.getHours()).padStart(2, "0");
                      const dmm = String(dptDate.getMinutes()).padStart(2, "0");

                      const arvDate = new Date(flight.arrivalDate);
                      const ayyyy = arvDate.getFullYear();
                      const aMM = String(arvDate.getMonth() + 1).padStart(
                        2,
                        "0"
                      );
                      const add = String(arvDate.getDate()).padStart(2, "0");
                      const ahh = String(arvDate.getHours()).padStart(2, "0");
                      const amm = String(arvDate.getMinutes()).padStart(2, "0");

                      return (
                        <tr key={flight.flightId}>
                          <th scope="row">{flight.flightId}</th>
                          <td>{flight.departureCity}</td>
                          <td>
                            {`${dyyyy}/${dMM}/${ddd}`} - {`${dhh}:${dmm}`}
                          </td>
                          <td>{flight.destinationCity}</td>
                          <td>
                            {`${ayyyy}/${aMM}/${add}`} - {`${ahh}:${amm}`}
                          </td>
                          <td>
                            <input
                              className="form-check-input"
                              type="checkbox"
                              readOnly
                              checked={flight.roundTrip}
                            />
                          </td>
                          <td>{flight.capacity}</td>
                          <td>{flight.remain}</td>
                          <td>{flight.price.toLocaleString("vi-VN")}</td>
                          <td>
                            <span style={{ display: "flex", gap: "10px" }}>
                              <Link
                                to={`/admin/flight-detail/${flight.flightId}`}
                                className="btn btn-outline-primary"
                              >
                                Detail
                              </Link>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
