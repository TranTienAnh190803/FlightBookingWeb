import { Carousel } from "bootstrap";
import Navbar from "../../components/Navbar";
import welcomeSlider from "../../assets/WelcomeSlide.jpg";
import adminWelcome from "../../assets/AdminWelcome.jpg";
import image1 from "../../assets/images1.jpg";
import image2 from "../../assets/images2.jpg";
import image3 from "../../assets/images3.jpg";
import style from "./HomePage.module.css";
import Footer from "../../components/Footer";
import UserService from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import partner1 from "../../assets/Airline/Vietjet.jpg";
import partner2 from "../../assets/Airline/VietnamAirline.jpg";
import partner3 from "../../assets/Airline/VietravelAirlines.jpg";
import partner4 from "../../assets/Airline/AllNiponAirways.jpg";
import partner5 from "../../assets/Airline/AsianaAirlines.jpg";
import partner6 from "../../assets/Airline/BambooAirway.jpg";
import partner7 from "../../assets/Airline/ChinaAirlines.jpg";
import partner8 from "../../assets/Airline/Emirates.jpg";
import partner9 from "../../assets/Airline/JapanAirlines.jpg";
import partner10 from "../../assets/Airline/KorreanAir.jpg";
import partner11 from "../../assets/Airline/MalaysiaAirline.jpg";
import partner12 from "../../assets/Airline/PacificAirline.jpg";
import partner13 from "../../assets/Airline/QatarAirway.jpg";
import partner14 from "../../assets/Airline/SingaporeAirlines.jpg";
import partner15 from "../../assets/Airline/ThaiLionAir.jpg";
import { useEffect, useState } from "react";
import FlightService from "../../services/FlightService";
import FlightCard from "../../components/FlightCard";

export default function HomePage() {
  const partners = [
    partner1,
    partner2,
    partner3,
    partner4,
    partner5,
    partner6,
    partner7,
    partner8,
    partner9,
    partner10,
    partner11,
    partner12,
    partner13,
    partner14,
    partner15,
  ];
  const [cheapFlights, setCheapFlights] = useState([]);
  const [noFlight, setNoFlight] = useState({
    noCheapFlight: false,
    message: "",
  });

  const fetchCheapFlights = async () => {
    const response = await FlightService.getCheapFlight();
    if (response.statusCode === 200) {
      setCheapFlights(response.flightList);
    } else {
      setNoFlight({ noCheapFlight: true, message: response.message });
    }
  };

  useEffect(() => {
    fetchCheapFlights();
  }, []);

  return (
    <div>
      <Navbar />
      {UserService.isAdmin() ? (
        <div className="position-relative">
          <img
            src={adminWelcome}
            className={`d-block w-100 ${style["carousel-img"]}`}
            alt="..."
          />
          <div
            className="d-none d-lg-block position-absolute ms-5 top-50"
            style={{ transform: "translateY(-50%)" }}
          >
            <h1>
              <b>Welcome back, Admin.</b>
            </h1>
            <h3>Let get to work</h3>
          </div>
        </div>
      ) : (
        <div>
          <div>
            <div
              id="carouselExampleCaptions"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
              data-bs-interval="3000"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active position-relative">
                  <img
                    src={welcomeSlider}
                    className={`d-block w-100 ${style["carousel-img"]}`}
                    alt="..."
                  />
                  <div
                    className="carousel-caption d-none d-md-block position-absolute"
                    style={{
                      top: "50%",
                      left: "-50%",
                      transform: "translateY(-45%)",
                    }}
                  >
                    <h1 className="text-dark my-5">
                      <b>Welcome to TTAFlight</b>
                    </h1>
                    <Link
                      className="btn btn-lg btn-outline-dark"
                      to={"/flights"}
                    >
                      Book A Flight
                    </Link>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src={image1}
                    className={`d-block w-100 ${style["carousel-img"]}`}
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h1>
                      <b>Bà Nà Hill</b>
                    </h1>
                    <p>
                      Ba Na Hills is a famous tourist destination in Vietnam
                      known for its stunning mountain views and the iconic
                      Golden Bridge.
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src={image2}
                    className={`d-block w-100 ${style["carousel-img"]}`}
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h1>
                      <b>Andong Hahoe</b>
                    </h1>
                    <p>
                      Andong Hahoe is a traditional Korean village famous for
                      its well-preserved Joseon-era houses and rich cultural
                      heritage.
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src={image3}
                    className={`d-block w-100 ${style["carousel-img"]}`}
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h1>
                      <b>Mount Fuji</b>
                    </h1>
                    <p>
                      Mount Fuji is Japan’s highest and most iconic mountain,
                      admired for its nearly perfect cone shape and cultural
                      significance.
                    </p>
                  </div>
                </div>
              </div>
              <button
                class="btn btn-dark rounded-circle position-absolute top-50 start-0 translate-middle-y ms-3 z-1"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="prev"
              >
                <span class="carousel-control-prev-icon"></span>
              </button>

              <button
                class="btn btn-dark rounded-circle position-absolute top-50 end-0 translate-middle-y me-3 z-1"
                type="button"
                data-bs-target="#carouselExampleCaptions"
                data-bs-slide="next"
              >
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          </div>
          <div className="my-5 d-flex justify-content-center">
            <div className={`${style["partnership-container"]} shadow`}>
              <h1>
                <b>Our Partners</b>
              </h1>
              <hr />
              <div className={style["partners"]}>
                {partners.map((value, index) => {
                  return (
                    <div className={style["partner"]}>
                      <img
                        src={value}
                        alt="error"
                        className={style["partner-icon"]}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="my-5 d-flex justify-content-center">
            <div className={`${style["cheap-flights"]} shadow`}>
              <h1>
                <b>
                  Cheap Flights (from only{" "}
                  <span className="text-danger">1.000.000 VNĐ</span> or less)
                </b>
              </h1>
              <hr />
              {noFlight.noCheapFlight ? (
                <div>
                  <center>
                    <h3 className="text-danger">
                      <b>{noFlight.message}</b>
                    </h3>
                  </center>
                </div>
              ) : (
                <div className={style["flights"]}>
                  {cheapFlights.map((flight) => {
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
              )}
            </div>
          </div>
          <div className="mt-5 bg-white text-center p-5 shadow">
            <h1 className="mt-5 mb-3">
              <b>
                Please let us know your feedback so we can improve our flight
                service.
              </b>
            </h1>
            <Link
              to={"/contact"}
              className="btn btn-lg btn-outline-secondary mt-3 mb-5"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
      <Footer homePage={true} />
    </div>
  );
}
