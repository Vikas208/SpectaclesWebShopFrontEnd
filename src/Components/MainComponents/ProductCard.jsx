import React from "react";
import "../../Css/ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
function ProductCard(props) {
  const navigation = useNavigate();
  return (
    <div
      className="productCard col"
      style={
        props?.isLarge && {
          flexDirection: "row",
          flexWrap: "wrap",
          borderRadius: "0px",
          padding: "0px 20px",
        }
      }
      onClick={() => navigation(`/product/${props?.props?.id}`)}
    >
      <img
        src={props?.props?.bannerImage}
        alt="#"
        style={props?.isLarge && { width: "100px", height: "100px" }}
      />
      <span>
        {String(props?.props?.p_name).length > 40
          ? String(props?.props?.p_name).substring(0, 40) + "..."
          : props?.props?.p_name}
      </span>
      <div>
        {" "}
        <Rating
          size="medium"
          defaultValue={props.props.rating ? props?.props?.rating : 0}
          precision={0.5}
          readOnly
        />
      </div>

      <span style={{ fontSize: "1.5em", color: "chocolate" }}>
        ₹{props?.props?.p_price}
      </span>
      <button>Shop now</button>
      <section
        className="productcard_footer"
        style={props.isLarge && { display: "none" }}
      >
        <span className="material-icons-outlined">favorite_border</span>
        <span className="material-icons-outlined">shopping_cart</span>
      </section>
    </div>
  );
}

export default ProductCard;
