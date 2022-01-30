import React from "react";
import "../../Css/main.css";
import { useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer";
import { actions } from "../../Reducer/action";
import { Logout } from "../../API/User";
function NavBar() {
  const [{ token, user, shopDetails }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  // handel MyAccount

  const handelClick = () => {
    navigate("myAccount");
  };

  return (
    <div className="navBar">
      <section className="uppermenu">
        <div className="upper_left" style={{ cursor: "pointer" }}>
          <img
            src={shopDetails.logoUrl}
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="upper_right">
          {token && (
            <div className="user_account" onClick={handelClick}>
              <span
                className="material-icons-outlined"
                style={{ fontSize: "26px" }}
              >
                account_circle
              </span>
              <span>{user.name}</span>
            </div>
          )}
          <span className="material-icons-outlined">favorite_border</span>
          <span className="material-icons-outlined">shopping_cart</span>
          {token ? (
            <span
              className="material-icons-outlined"
              onClick={async () => {
                dispatch({
                  type: actions.LOGOUT,
                });
                console.log(await Logout());
              }}
            >
              logout
            </span>
          ) : (
            <span
              className="material-icons-outlined"
              onClick={() => {
                navigate("/login");
              }}
            >
              login
            </span>
          )}
        </div>
      </section>
      <section
        className="lowermenu"
        style={{ borderBottom: "1px solid rgba(27, 31, 35, 0.15)" }}
      >
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-dark"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Eye Glasses
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/">
                        Men
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Women
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Kids
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle text-dark"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sun Glasses
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/">
                        Men
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Women
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Kids
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown ">
                  <a
                    className="nav-link dropdown-toggle text-dark"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Contact Lenses
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <a className="dropdown-item" href="/">
                        Men
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Women
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/">
                        Kids
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    User Guide
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <input
                  className="form-control me-2 p-2"
                  type="search"
                  placeholder="Search for Product"
                  aria-label="Search"
                />
                <button className="btn btn-dark" type="button">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
}

export default NavBar;