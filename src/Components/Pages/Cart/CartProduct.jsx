import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { updateCartDetails } from "../../../API/CustomerProduct";
import { useNavigate } from "react-router-dom";
import "../../../Css/cartproduct.css";
import { useDataLayerValue } from "../../../DataLayer";
import { actions } from "../../../Reducer/action";
function CartProduct(props) {
  const navigate = useNavigate();
  const qty = useRef(1);
  const leftEye = useRef(0);
  const rightEye = useRef(0);
  const onlyframe = useRef(false);
  const [glassType, setGlassType] = useState("");
  const [hide, setHide] = useState(Boolean(props?.props?.onlyframe));
  const [{ glassTypeDetails }, dispatch] = useDataLayerValue();

  const updateDetails = async () => {
    let data = {
      id: props?.props?.id,
      qty: Number(qty.current.value),
      glassType: glassType,
      onlyframe: onlyframe.current.checked,
      left_eye_no: Number(leftEye.current.value),
      right_eye_no: Number(rightEye.current.value),
    };
    let response = await updateCartDetails(data);
    if (response.status === 200) {
      let result = await response.json();
      console.log(result);
      dispatch({
        type: actions.RELOADCARTPRICING,
        reloadCartPricing: true,
      });
    }
  };

  return (
    <div>
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
      <p className="price">
        ₹
        {(
          props?.props?.products?.p_price -
          props?.props?.products?.productSales?.saleOff -
          (props?.props?.products?.p_price *
            props?.props?.products?.productSales?.salePercentage) /
            100
        ).toFixed(2)}
      </p>
      <form>
        <div className="input">
          <label>Qty</label>
          <input
            type="Number"
            className="form-control"
            defaultValue={props?.props?.qty}
            ref={qty}
            min={1}
          />
        </div>
        {String(
          props?.props?.products?.productDescription?.p_category
        ).toLowerCase() !== "Sun Glass".toLowerCase() && (
          <>
            {String(
              props?.props?.products?.productDescription?.p_category
            ).toLowerCase() !== "lens".toLowerCase() && (
              <div>
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Only Frame
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue={props?.props?.onlyframe}
                  id="defaultCheck1"
                  ref={onlyframe}
                  onChange={() => {
                    setHide((pre) => !pre);
                  }}
                />
              </div>
            )}

            {hide === false && (
              <>
                <div className="input">
                  <label>Left Eye Number</label>
                  <input
                    type="Number"
                    className="form-control"
                    defaultValue={props?.props?.left_eye_no}
                    ref={leftEye}
                  />
                </div>
                <div className="input">
                  <label>Right Eye Number</label>
                  <input
                    type="Number"
                    className="form-control"
                    defaultValue={props?.props?.right_eye_no}
                    ref={rightEye}
                  />
                </div>
                {String(
                  props?.props?.products?.productDescription?.p_category
                ).toLowerCase() !== "lens".toLowerCase() &&
                  glassTypeDetails &&
                  glassTypeDetails?.map((element) => {
                    return (
                      <div key={element?.id}>
                        <label
                          className="form-check-label"
                          htmlFor="exampleRadios1"
                        >
                          {element?.glass_name}
                        </label>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="glassType"
                          id="exampleRadios1"
                          defaultChecked={
                            props?.props?.glassType === element?.glass_name
                          }
                          onChange={() => {
                            setGlassType(element?.glass_name);
                          }}
                        />
                      </div>
                    );
                  })}
              </>
            )}
          </>
        )}
        <section className="d-flex flex-column justify-content-center align-items-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              updateDetails();
            }}
            className="cart_product_button"
          >
            Update
          </button>
          <button
            className="cart_product_button"
            onClick={() => navigate(`/product/${props?.props?.p_id}`)}
          >
            Go To Product
          </button>
        </section>
        <br />
        <small>Please Click on update if you change the details</small>
        <br />
      </form>
    </div>
  );
}

export default CartProduct;
