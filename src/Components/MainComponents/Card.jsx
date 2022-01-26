import React from "react";
import { IMAGE } from "../../API/ImageLink";
import "../../Css/Card.css";
import { useNavigate } from "react-router-dom";
function Card({ image, text, onclicktext }) {
  const navigation = useNavigate();

  return (
    <div
      className="card"
      onClick={() => {
        navigation(onclicktext);
      }}
    >
      <img src={IMAGE + image} alt="" />
      <span>{text}</span>
    </div>
  );
}

export default Card;
