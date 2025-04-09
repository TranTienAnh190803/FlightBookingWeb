import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top py-3 fs-6">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo */}
        <Link className="navbar-brand mx-3 fs-3" to={"/home"}>
          Logo
        </Link>

        {/* Navigate */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
          </ul>
        </div>

        {/* mini profile */}
        <div className="d-flex align-items-center gap-2 mx-3">
          <span className="text-white">Tiến Anh</span>
          <img
            src="avatar.jpg"
            alt="Avatar"
            className="rounded-circle"
            height="32"
          />
        </div>
      </div>
    </nav>
  );
}
