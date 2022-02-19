import React, { useEffect, useRef } from "react";
import "../../Css/main.css";
import { useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer";
import { actions } from "../../Reducer/action";
import { Logout } from "../../API/User";

function NavBar() {
  const [
    { token, user, shopDetails, categories, NumberOfCartProducts },
    dispatch,
  ] = useDataLayerValue();
  const navigate = useNavigate();
  const searchProduct = useRef("");
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
          {token && (
            <>
              <span
                className="material-icons"
                style={{ color: "#ed3f3f" }}
                onClick={() => {
                  navigate("/wishlist");
                }}
              >
                favorite
              </span>
              <section className="d-flex">
                <span
                  className={
                    NumberOfCartProducts !== 0
                      ? "material-icons"
                      : "material-icons-outlined"
                  }
                  id="nav_cart"
                  style={{
                    color: "#469ad7",
                  }}
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  shopping_cart
                </span>
                <span>{NumberOfCartProducts}</span>
              </section>
            </>
          )}
          {token ? (
            <span
              className="material-icons-outlined"
              style={{ color: "#ff0000" }}
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
              style={{ color: "#0995fb" }}
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
                {categories?.length !== 0 &&
                  categories.map((element, index) => {
                    return (
                      <li className="nav-item dropdown" key={index}>
                        <a
                          className="nav-link dropdown-toggle text-dark"
                          href="/"
                          id="navbarDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {element?.data}
                        </a>
                        <ul
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdown"
                        >
                          <li>
                            {/* Pass url as filterproducts/:product/:category/:frameStyle/:companyName:/group/:framesize  */}
                            <span
                              className="dropdown-item"
                              onClick={() => {
                                navigate(
                                  `/filterproducts/^/${element?.data}/^/^/male/^/0/0`
                                );
                              }}
                            >
                              Men
                            </span>
                          </li>
                          <li>
                            <span
                              className="dropdown-item"
                              onClick={() =>
                                navigate(
                                  `/filterproducts/^/${element?.data}/^/^/female/^/0/0`
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              Women
                            </span>
                          </li>
                          <li>
                            <span
                              className="dropdown-item"
                              onClick={() =>
                                navigate(
                                  `/filterproducts/^/${element?.data}/^/^/kids/^/0/0`
                                )
                              }
                            >
                              Kids
                            </span>
                          </li>
                        </ul>
                      </li>
                    );
                  })}

                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    User Guide
                  </a>
                </li>
              </ul>
              <form
                className="d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  navigate(`/search/${searchProduct.current.value}`);
                }}
              >
                <input
                  className="form-control me-2 p-2"
                  type="search"
                  placeholder="Search for Product Name"
                  aria-label="Search"
                  ref={searchProduct}
                  required
                />
                <button className="btn btn-dark" type="submit">
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
