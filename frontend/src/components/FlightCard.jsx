export default function FlightCard({
  airline,
  flightName,
  departureDate,
  roundTrip,
  returnDate,
  remain,
  price,
}) {
  const getDate = (d) => {
    const date = new Date(d);
    const yyyy = date.getFullYear();
    const MM = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${yyyy}/${MM}/${dd}`;
  };

  const getTime = (d) => {
    const date = new Date(d);
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    return `${hh}:${mm}`;
  };

  return (
    <div className="card position-relative h-100">
      <div className="position-absolute top-0 end-0">
        {roundTrip && (
          <span
            className="badge bg-warning text-dark m-2 shadow-sm"
            style={{ borderRadius: "0 0 0 0.5rem" }}
          >
            Round-trip
          </span>
        )}
        {remain === 0 && (
          <span
            className="badge bg-danger text-white m-2 shadow-sm"
            style={{ borderRadius: "0 0 0 0.5rem" }}
          >
            Full
          </span>
        )}
      </div>

      <h5 className="card-header">
        <b>{airline}</b>
      </h5>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <b>{flightName}</b>
        </h5>
        <p className="card-text text-muted">
          Departure Date: {getDate(departureDate)} - Time:{" "}
          {getTime(departureDate)}
        </p>
        {roundTrip && (
          <p className="card-text text-muted">
            Return Date: {getDate(returnDate)} - Time: {getTime(returnDate)}
          </p>
        )}

        <div className="mt-auto">
          <p className="text-end mb-2">
            Base Price: {price.toLocaleString("vi-VN")} VNĐ
          </p>
          <div className="btn btn-primary w-100">Let's go</div>
        </div>
      </div>
    </div>
  );
}
