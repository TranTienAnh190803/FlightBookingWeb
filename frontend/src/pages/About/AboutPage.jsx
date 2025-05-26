import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import style from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["about"]}>
          <h1>✈️ About Us</h1>
          <hr />
          <div className="p-3 fs-5">
            <ul>
              <li className="my-3">
                Welcome to TTAFlight — your all-in-one destination for
                effortless, secure, and reliable flight bookings. As a modern
                digital travel platform, we are committed to redefining how
                people plan and book air travel by offering a seamless and
                transparent experience from start to finish. Whether you're
                flying for business, vacation, study, or a spontaneous weekend
                getaway, we aim to make your journey as smooth as possible —
                starting from your very first search.
              </li>
              <li className="my-3">
                At the core of our mission is customer empowerment. We believe
                that travelers deserve full control over their choices — from
                selecting the most convenient flight time and route to finding
                the best fares that fit their budgets. That’s why we work
                closely with a wide range of airline partners, including Vietnam
                Airlines, Vietjet Air, Bamboo Airways, and many top
                international carriers, to bring you a broad and competitive
                selection of flight options at your fingertips.
              </li>
              <li className="my-3">
                What sets us apart is not just the technology behind our
                platform, but the values that drive it. We combine modern design
                with intelligent features — including real-time flight updates,
                smart filtering, secure online payment, and instant e-ticket
                delivery — to ensure that every booking is fast, accurate, and
                stress-free. Our responsive customer service team is also
                available 24/7, ready to support you with any questions or
                concerns throughout your booking process and beyond.
              </li>
              <li className="my-3">
                Data security and user privacy are top priorities for us. We
                utilize advanced encryption technologies and strict internal
                protocols to protect your personal and payment information, so
                you can book with confidence and peace of mind.
              </li>
              <li className="my-3">
                Over the years, TTAFlight has grown to become more than just a
                flight booking site — we’ve become a trusted travel companion
                for thousands of individuals, families, and companies. We are
                continuously improving our services based on user feedback,
                travel trends, and the evolving needs of modern travelers.
              </li>
              <li className="my-3">
                Thank you for choosing TTAFlight. We're honored to be part of
                your journey — whether it's across the country or across the
                globe. Let us help you explore new destinations, connect with
                loved ones, and experience the world with greater convenience
                than ever before.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
