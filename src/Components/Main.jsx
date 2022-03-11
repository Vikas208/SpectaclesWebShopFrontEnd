import React from "react";
import ContactBar from "./MainComponents/ContactBar";
import "../Css/main.css";
import NavBar from "./MainComponents/NavBar";
import Footer from "./MainComponents/Footer";

import { Outlet } from "react-router-dom";
import { useDataLayerValue } from "../DataLayer";
import ProductOrderPage from "../Components/Pages/Order/ProductOrderPage";
function Main() {
  const [{ showOrderProductDialog }] = useDataLayerValue();
  return (
    <div className="main">
      <ContactBar />
      <NavBar />
      <div style={{ minHeight: "50vh" }}>
        {showOrderProductDialog && <ProductOrderPage />}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Main;
