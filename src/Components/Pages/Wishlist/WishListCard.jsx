import React from "react";
import { Rating } from "@mui/material";
import "../../../Css/ProductCard.css";
import { useDataLayerValue } from "../../../DataLayer";
import { saveToCart } from "../../../API/CustomerProduct";
import { actions } from "../../../Reducer/action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function WishListCard(props) {
  const [{ user, NumberOfCartProducts }, dispatch] = useDataLayerValue();
  const navigate = useNavigate();
  const handelSaveToCart = async () => {
    let data = {
      c_id: user?.id,
      p_id: props?.props?.p_id,
    };
    let response = await saveToCart(data);
    console.log(response);
    if (response.status === 200) {
      let result = await response.json();
      dispatch({
        type: actions.SETCART,
        NumberOfCartProducts: NumberOfCartProducts + 1,
      });
    } else {
      toast.error("Something is Wrong");
    }
  };
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
            Number(props?.props?.products?.rating)
              ? Number(props?.props?.products?.rating).toFixed(2)
              : 0
          }
          precision={0.5}
          readOnly
          color="red"
        />
      </div>
      <p className="price">₹{props?.props?.products?.p_price}</p>
      <section className="d-flex flex-column">
        <button
          className="_btn"
          onClick={(e) => {
            handelSaveToCart();
          }}
        >
          Move To Cart
        </button>
        <button
          className="_btn"
          onClick={(e) => {
            navigate(`/product/${props?.props?.p_id}`);
          }}
        >
          Go To Product
        </button>
      </section>
    </div>
  );
}

export default WishListCard;
