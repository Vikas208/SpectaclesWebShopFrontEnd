import React from "react";
import "../../Css/main.css";
import { useDataLayerValue } from "../../DataLayer";
function Footer() {
  const [{ shopDetails }] = useDataLayerValue();
  return (
    <div className="footer">
      <div className="info">
        <section className="footer_address">
          <span className="material-icons-outlined">place</span>
          <section>
            <span>
              {shopDetails.address.address +
                " " +
                shopDetails.address.city +
                " " +
                shopDetails.address.pinCode}
            </span>
          </section>
        </section>
        <section className="footer_phonenumber">
          <span className="material-icons-outlined">call</span>
          <section>
            {shopDetails.phoneNumber.map((number, index) => {
              return <span key={index}>+91 {String(number).trim()}</span>;
            })}
          </section>
        </section>
        <section className="footer_mail">
          <span className="material-icons-outlined">mail</span>
          <section>
            {shopDetails.mailId.map((mailId, index) => {
              return <span key={index}>{mailId}</span>;
            })}
          </section>
        </section>
      </div>
    </div>
  );
}

export default Footer;
