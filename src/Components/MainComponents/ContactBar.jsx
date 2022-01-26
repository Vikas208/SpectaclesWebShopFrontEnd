import React from "react";
import "../../Css/main.css";
import { useDataLayerValue } from "../../DataLayer";
function ContactBar() {
  const [{ shopDetails }, dispatch] = useDataLayerValue();
  // console.log(shopDetails);
  return (
    <div className="contactBar">
      <section className="mailId">
        <span className="material-icons-outlined">mail</span>
        {shopDetails && <span>{shopDetails?.mailId[0]}</span>}
      </section>
      <section className="phonenumber">
        <span className="material-icons-outlined">call</span>
        {shopDetails && <span>{shopDetails?.phoneNumber[0]}</span>}
      </section>
    </div>
  );
}

export default ContactBar;
