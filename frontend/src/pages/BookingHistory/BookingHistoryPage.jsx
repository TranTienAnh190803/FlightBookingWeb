import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import style from "./BookingHistoryPage.module.css";
import UserService from "../../services/UserService";
import FlightTicketService from "../../services/FlightTicketService";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

export default function BookingHistoryPage() {
  const navigate = useNavigate();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isBooked, setIsBooked] = useState(true);

  const fetchBookingHistory = async () => {
    if (UserService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const response = await FlightTicketService.getBookingHistory(token);
      if (response.statusCode === 200) {
        const historyList = response.flightHistoryList;
        if (historyList.length !== 0) {
          setBookingHistory(historyList);
        } else {
          setIsBooked(false);
        }
      } else {
        alert(response.message);
        navigate("/");
      }
    }
  };

  useEffect(() => {
    document.title = "Booking History";
    fetchBookingHistory();
  }, []);

  // Convert function
  const getDate = (d) => {
    const date = new Date(d);

    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${dd}/${MM}/${yyyy}`;
  };

  const getTime = (d) => {
    const date = new Date(d);

    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    return `${hh}:${mm}`;
  };

  return (
    <div className={isBooked || "position-relative vh-100"}>
      <Navbar />
      <div className={style["wrapper"]}>
        <Sidebar />
        <div className={`${style["booking-history"]} shadow`}>
          <h1>
            <b>Booking History</b>
          </h1>
          <hr />
          <div className="history-container">
            {isBooked ? (
              <div className="list-group">
                {bookingHistory.map((value, index) => {
                  return (
                    <Link
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-start"
                      to={`/user/booking-detail/${value.ticketId}`}
                      key={index}
                    >
                      <div className="ms-2 me-auto p-1">
                        <h4 className="fw-bold">{value.flight.flightName}</h4>
                        <small>
                          Departure Airport: {value.flight.departureAirport}
                        </small>{" "}
                        <br />
                        <small>
                          Departure Date:{" "}
                          {`${getDate(value.flight.departureDate)} | ${getTime(
                            value.flight.departureDate
                          )}`}
                        </small>{" "}
                        <br />
                        <small>
                          Total Seat:{" "}
                          {value.adultSeat +
                            value.childrenSeat +
                            value.babySeat}
                        </small>{" "}
                        <br />
                        <small>
                          Total Price:{" "}
                          {value.totalPrice.toLocaleString("vi-VN")} VNĐ
                        </small>
                      </div>
                      <span className="badge text-bg-primary rounded-pill">
                        {`${getDate(value.bookingDate)} | ${getTime(
                          value.bookingDate
                        )}`}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="my-5">
                <center>
                  <h4>
                    You Haven't Booked Any Flight Yet,{" "}
                    <Link to={"/flights"}>
                      Let's Book A Flight For Your Vacation.
                    </Link>
                  </h4>
                </center>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer booked={isBooked} />
    </div>
  );
}
