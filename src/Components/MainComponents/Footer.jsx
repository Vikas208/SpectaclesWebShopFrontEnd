import React from "react";
import "../../Css/main.css";
import { useDataLayerValue } from "../../DataLayer";
function Footer() {
  const [{ shopDetails }] = useDataLayerValue();
  return (
    <div
      className="d-flex p-4 justify-content-between align-items-center flex-wrap bg-dark text-white  "
      style={{ marginTop: "auto" }}
    >
      <fieldset className="flex-fill">
        <legend>Address</legend>
        <section className="d-flex align-items-center">
          <span className="material-icons-outlined">place</span>
          <span>
            {shopDetails.address.address +
              " " +
              shopDetails.address.city +
              "-" +
              shopDetails.address.pinCode}
          </span>
        </section>
      </fieldset>
      <fieldset className="flex-fill mt-3">
        <legend>Contact Us</legend>
        <section className="d-flex align-items-center">
          <span className="material-icons-outlined">call</span>
          {shopDetails.phoneNumber.map((element, index) => {
            return (
              <span key={index} className="ms-2">
                {element}
              </span>
            );
          })}
        </section>
        <section className="d-flex align-items-center mt-2">
          <span className="material-icons-outlined">mail</span>
          {shopDetails.mailId.map((element, index) => {
            return (
              <span key={index} className="ms-2">
                {element}
              </span>
            );
          })}
        </section>
      </fieldset>
    </div>
  );
}

export default Footer;
