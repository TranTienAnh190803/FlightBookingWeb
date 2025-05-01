export default function FlightCard({
  airline,
  flightName,
  departureDate,
  roundTrip,
  returnDate,
  price,
}) {
  const dptDate = new Date(departureDate);
  const dyyyy = dptDate.getFullYear();
  const dMM = String(dptDate.getMonth() + 1).padStart(2, "0");
  const ddd = String(dptDate.getDate()).padStart(2, "0");
  const dhh = String(dptDate.getHours()).padStart(2, "0");
  const dmm = String(dptDate.getMinutes()).padStart(2, "0");

  const rtDate = new Date(returnDate);
  const ryyyy = rtDate.getFullYear();
  const rMM = String(rtDate.getMonth() + 1).padStart(2, "0");
  const rdd = String(rtDate.getDate()).padStart(2, "0");
  const rhh = String(rtDate.getHours()).padStart(2, "0");
  const rmm = String(rtDate.getMinutes()).padStart(2, "0");

  return (
    <div className="card position-relative h-100">
      {roundTrip && (
        <span
          className="position-absolute top-0 end-0 badge bg-warning text-dark m-2 shadow-sm"
          style={{ borderRadius: "0 0 0 0.5rem" }}
        >
          Round-trip
        </span>
      )}
      <h5 className="card-header">
        <b>{airline}</b>
      </h5>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">
          <b>{flightName}</b>
        </h5>
        <p className="card-text text-muted">
          Departure Date: {`${dyyyy}/${dMM}/${ddd}`} - Time: {`${dhh}:${dmm}`}
        </p>
        {roundTrip && (
          <p className="card-text text-muted">
            Return Date: {`${ryyyy}/${rMM}/${rdd}`} - Time: {`${rhh}:${rmm}`}
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
