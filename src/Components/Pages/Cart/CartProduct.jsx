import React from "react";
import { useRef, useState } from "react";
import { updateCartDetails } from "../../../API/CustomerProduct";

import "../../../Css/cartproduct.css";
function CartProduct(props) {
  const qty = useRef(1);
  const leftEye = useRef(0);
  const rightEye = useRef(0);
  const glass = useRef(false);
  const fiber = useRef(true);
  const onlyframe = useRef(false);

  const [hide, setHide] = useState(Boolean(props?.props?.onlyframe));

  const updateDetails = async (e) => {
    e.preventDefault();
    let data = {
      id: props?.props?.id,
      qty: props?.props?.qty,
      glassType:
        (!(glass.current.checked && "Glass") ||
          (fiber.current.checked && "Fiber")) &&
        "",
      onlyframe: onlyframe.current.checked,
      left_eye_no: Number(leftEye.current.value),
      right_eye_no: Number(rightEye.current.value),
    };
    let response = await updateCartDetails(data);
    if (response.status === 200) {
      let result = await response.json();
      console.log(result);
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
          props?.props?.products?.productSales.saleOff -
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
        {props?.props?.products?.productDescription?.p_category !==
          "Sun Glass" && (
          <>
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

                <div>
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Glass
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="glassType"
                    id="exampleRadios1"
                    ref={glass}
                  />
                </div>
                <div>
                  <label className="form-check-label" htmlFor="exampleRadios1">
                    Fiber Glass
                  </label>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="glassType"
                    id="exampleRadios1"
                    ref={fiber}
                  />
                </div>
              </>
            )}
          </>
        )}

        <button onClick={updateDetails}>Update</button>
        <br />
        <small>Please Click on update if you change the details</small>
        <br />
      </form>
    </div>
  );
}

export default CartProduct;
