import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import style from "./AdminFlightDetail.module.css";

export default function AdminFlightDetail() {
  const { flightId } = useParams("flightId");

  return (
    <div>
      <Navbar />
      <div className={style["wrapper"]}>
        <div className={style["flight-detail"]}>
          <h1>
            <b>Flight Detail</b>
          </h1>
          <hr />
        </div>
      </div>
    </div>
  );
}
