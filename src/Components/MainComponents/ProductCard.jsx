import React from "react";
import "../../Css/ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { useDataLayerValue } from "../../DataLayer";
import { saveToCart, saveToWishList } from "../../API/CustomerProduct";
import { actions } from "../../Reducer/action";
import { toast } from "react-toastify";
function ProductCard(props) {
  const [{ token, user, NumberOfCartProducts }, dispatch] = useDataLayerValue();
  const navigation = useNavigate();

  const handelSaveToCart = async () => {
    let data = {
      c_id: user?.id,
      p_id: props?.props?.id,
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
  const handelSaveToWishList = async () => {
    let data = {
      c_id: user?.id,
      p_id: props?.props?.id,
    };
    let response = await saveToWishList(data);
    if (response.status !== 200) {
      let result = await response.json();
      console.log(result);
      toast.info(result.message);
    }
  };
  return (
    <div
      className="productCard col"
      onClick={(e) => {
        navigation(`/product/${props?.props?.id}`);
      }}
    >
      <img
        src={props?.props?.bannerImage}
        alt="#"
        style={{ width: "200px", height: "200px" }}
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
          color="red"
        />
      </div>

      <span style={{ fontSize: "1.5em", color: "#e91919" }}>
        ₹{props?.props?.p_price}
      </span>
      <button className="_btn">Shop now</button>
      <section
        className="productcard_footer"
        style={props.isLarge && { display: "none" }}
      >
        <span
          className="material-icons"
          style={{ color: "rgb(239 83 83)" }}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            token ? handelSaveToWishList() : navigation("/login");
          }}
        >
          favorite
        </span>
        <span
          className="material-icons"
          style={{
            color: "#6f65c1",
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            token ? handelSaveToCart() : navigation("/login");
          }}
        >
          shopping_cart
        </span>
      </section>
    </div>
  );
}

export default ProductCard;
