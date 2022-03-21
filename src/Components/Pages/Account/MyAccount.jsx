import React from "react";
import Card from "../../MainComponents/Card";
import "../../../Css/account.css";
import { PROFILEIMAGE, YOUR_ORDER_IMAGE } from "../../../API/ImageLink";

function MyAccount() {
  return (
    <div className="container d-flex flex-wrap justify-content-center align-items-center m-10">
      {/* Your Orders */}
      {/* Profile */}
      <Card
        image={YOUR_ORDER_IMAGE}
        text={"Your Orders"}
        onclicktext="orders"
      />
      <Card image={PROFILEIMAGE} text={"Profile"} onclicktext="profile" />
    </div>
  );
}
export default MyAccount;
