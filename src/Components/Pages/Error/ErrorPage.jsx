import React from "react";
import { IMAGE } from "../../../API/ImageLink";
import "../../../Css/error.css";
import ContactBar from "../../MainComponents/ContactBar";
import NavBar from "../../MainComponents/NavBar";
function ErrorPage({ imagelink, text }) {
  return (
    <>
      <ContactBar />
      <NavBar />
      <div className="errorPage">
        <img src={imagelink} alt="404 not Found" />
        <span>{text}</span>
      </div>
    </>
  );
}

export default ErrorPage;
