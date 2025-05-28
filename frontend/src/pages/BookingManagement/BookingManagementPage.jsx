import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import style from "./BookingManagementPage.module.css";
import UserService from "../../services/UserService";
import FlightTicketService from "../../services/FlightTicketService";
import { Link } from "react-router-dom";

export default function BookingManagementPage() {
  const [bookedInfo, setBookedInfo] = useState([]);
  const [searchForm, setSearchForm] = useState("");
  const [isEmpty, setIsEmpty] = useState({
    status: false,
    message: "",
  });

  const fetchBookedInfo = async () => {
    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      const response = await FlightTicketService.getAllBookedInfo(token);
      if (response.statusCode === 200) {
        setBookedInfo(response.bookedInfoList);
      } else {
        setIsEmpty({ status: true, message: response.message });
      }
    }
  };

  useEffect(() => {
    document.title = "Booking Management";
    fetchBookedInfo();
  }, []);

  const getFullDate = (d) => {
    const date = new Date(d);

    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    return `${dd}/${MM}/${yyyy} | ${hh}:${mm}`;
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (UserService.isAdmin()) {
      const token = localStorage.getItem("token");
      if (searchForm !== "") {
        const response = await FlightTicketService.searchBookedInfo(
          token,
          searchForm
        );
        if (response.statusCode === 200) {
          setIsEmpty({ status: false, message: "" });
          setBookedInfo([response.bookedInfo]);
        } else {
          setIsEmpty({ status: true, message: response.message });
        }
      } else {
        setIsEmpty({ status: false, message: "" });
        fetchBookedInfo();
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["booked-list"]}>
          <h1>
            <b>Booking Management</b>
          </h1>
          <hr />
          <div>
            <div className="d-flex justify-content-end">
              <input
                type="text"
                name="searchForm"
                className="form-control border-secondary w-25 mx-3"
                placeholder="Ticket ID"
                value={searchForm}
                onChange={(e) => {
                  setSearchForm(e.target.value);
                }}
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
            <div>
              {!isEmpty.status ? (
                <div className="list-group my-4">
                  {bookedInfo.map((value, index) => {
                    return (
                      <Link
                        className="list-group-item list-group-item-action d-flex justify-content-between align-items-start py-3"
                        to={`/admin/booked-info/${value.ticketId}`}
                        key={index}
                      >
                        <div className="ms-2 me-auto p-1">
                          <h4 className="fw-bold">
                            <span className="text-danger">
                              Ticket ID: {value.ticketId}
                            </span>{" "}
                            - {value.flight.flightName}
                          </h4>
                          <small>
                            <b>Username:</b> {value.username}
                          </small>{" "}
                          <br />
                          <small>
                            <b>Fullname:</b> {value.fullname}
                          </small>{" "}
                          <br />
                          <small>
                            <b>Email:</b> {value.email}
                          </small>{" "}
                          <br />
                          <small>
                            <b>Phone Number:</b> {value.phoneNumber}
                          </small>{" "}
                          <br />
                          <small>
                            <b>Total Seat: </b>
                            {value.adultSeat +
                              value.childrenSeat +
                              value.babySeat}
                          </small>{" "}
                          <br />
                          <small>
                            <b>Total Price: </b>
                            {value.totalPrice.toLocaleString("vi-VN")} VNĐ
                          </small>
                        </div>
                        <span className="badge text-bg-primary rounded-pill">
                          {getFullDate(value.bookingDate)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <center className="my-5">
                  <h3 className="text-danger">{isEmpty.message}</h3>
                </center>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
