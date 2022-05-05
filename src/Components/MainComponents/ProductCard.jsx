import React, { useState, useEffect } from "react";
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
  const [hide, setHide] = useState(false);

  useEffect(() => {
    return () => {
      setHide(false);
    };
  }, []);
  const handelSaveToCart = async () => {
    let data = {
      common_id: user?.id,
      p_id: props?.props?.id,
    };
    let response = await saveToCart(data);
    //console.log(response);
    if (response.status === 200) {
      // let result = await response.json();
      dispatch({
        type: actions.SETCART,
        NumberOfCartProducts: NumberOfCartProducts + 1,
      });
      setHide(true);
      setTimeout(() => {
        setHide(false);
      }, 5000);
    } else {
      toast.error("Something is Wrong");
    }
  };
  const handelSaveToWishList = async () => {
    let data = {
      common_id: user?.id,
      p_id: props?.props?.id,
    };
    let response = await saveToWishList(data);
    if (response.status !== 200) {
      let result = await response.json();
      //console.log(result);
      toast.info(result.message);
    }
    if (response.status === 200) {
      setHide(true);
      setTimeout(() => {
        setHide(false);
      }, 5000);
    }
  };

  return (
    <div
      className="productCard col"
      onClick={(e) => {
        navigation(`/product/${props?.props?.id}`);
      }}
      style={
        props?.isLarge && {
          display: "flex",
          flexDirection: "row",
          padding: "10px",
        }
      }
    >
      <img
        src={props?.props?.bannerImage}
        alt="#"
        style={
          props?.isLarge
            ? { width: "100px", height: "100px" }
            : { width: "200px", height: "200px" }
        }
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
      <button
        className="_btn"
        style={props?.isLarge && { width: "100px" }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.nativeEvent.stopImmediatePropagation();
          if (token) {
            dispatch({
              type: actions.ISCARTORDER,
              isCardOrder: null,
            });
            dispatch({
              type: actions.SETSHOPNOWPRODUCT,
              shopNowProduct: props?.props?.id,
            });
            dispatch({
              type: actions.SETSHOWORDERDIALOG,
              showOrderProductDialog: true,
            });
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          } else {
            navigation("/login");
          }
        }}
      >
        Shop now
      </button>
      <section
        className="productcard_footer"
        style={props?.isLarge && { display: "none" }}
      >
        <span
          className="material-icons"
          style={{ color: "rgb(239 83 83)" }}
          id="ProductCard_wishlist"
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            token ? handelSaveToWishList(e) : navigation("/login");
          }}
        >
          favorite
        </span>

        <span
          className="material-icons"
          style={{ color: "#6f65c1" }}
          id="ProductCard_cart"
          onClick={(e) => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            token ? handelSaveToCart() : navigation("/login");
          }}
        >
          shopping_cart
        </span>
      </section>
      <br />
      {hide && <small style={{ color: "green" }}>Added !</small>}
    </div>
  );
}

export default ProductCard;
