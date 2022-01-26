import React from "react";
import "../../Css/main.css";
import { useNavigate } from "react-router-dom";
import { useDataLayerValue } from "../../DataLayer";
import { IMAGE } from "../../API/ImageLink";
import { actions } from "../../Reducer/action";
import { Logout } from "../../API/User";
function NavBar() {
  const [{ token, user }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  // handel MyAccount

  const handelClick = () => {
    navigate("myAccount");
  };

  return (
    <div className="navBar">
      <section className="uppermenu">
        <div className="upper_left">
          <img src={IMAGE + "1YAoWXjv61lPIbCVNJwFYnm-xfNKSviAw"} alt="logo" />
        </div>
        <div className="upper_right">
          {token && (
            <div className="user_account" onClick={handelClick}>
              <span
                className="material-icons-outlined"
                style={{ fontSize: "20px" }}
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
      <section className="lowermenu"></section>
    </div>
  );
}

export default NavBar;
