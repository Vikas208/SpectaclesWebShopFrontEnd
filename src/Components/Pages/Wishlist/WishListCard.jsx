import React from "react";
import { Rating } from "@mui/material";
import "../../../Css/ProductCard.css";
function WishListCard(props) {
  return (
    <div className=" col">
      <section style={{ maxHeight: "200px" }}>
        <img
          src={props?.props?.products?.bannerImage}
          alt=""
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
      </section>

      <section>
        <p style={{ fontSize: "18px" }}>
          {String(props?.props?.products?.p_name).length > 40
            ? String(props?.props?.products?.p_name).substring(0, 40) + "..."
            : props?.props?.products?.p_name}
        </p>
      </section>
      <div>
        {" "}
        <Rating
          size="medium"
          defaultValue={
            props?.props?.products?.rating
              ? Number(props?.props?.products?.rating).toFixed(2)
              : 0
          }
          precision={0.5}
          readOnly
          color="red"
        />
      </div>
      <p className="price">₹{props?.props?.products?.p_price}</p>
      <button className="_btn">Move To Cart</button>
    </div>
  );
}

export default WishListCard;
