import React from "react";
import ContactBar from "./MainComponents/ContactBar";
import "../Css/main.css";
import NavBar from "./MainComponents/NavBar";
import Footer from "./MainComponents/Footer";

import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div className="main">
      <ContactBar />
      <NavBar />
      <div style={{ minHeight: "50vh" }}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
