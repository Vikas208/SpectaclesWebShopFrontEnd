import React from "react";
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
      {image && <img src={image} alt="" />}
      <span>{text}</span>
    </div>
  );
}

export default Card;
