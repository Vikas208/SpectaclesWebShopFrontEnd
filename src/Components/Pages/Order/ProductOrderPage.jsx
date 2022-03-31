import React, { useEffect, useRef, useState } from "react";
import { useDataLayerValue } from "../../../DataLayer";
import { getOrderedProductDetails } from "../../../API/Product";
import { actions } from "../../../Reducer/action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateProductData } from "../../../API/Order";

function ProductOrderPage() {
  const [{ shopNowProduct, glassTypeDetails }, dispatch] = useDataLayerValue();
  const [product, setProduct] = useState([]);
  const [hide, setHide] = useState(false);
  const [showError, setShowError] = useState(false);
  const [glasssType, setGlassType] = useState("");
  const box = useRef(null);
  const navigate = useNavigate();

  const fetchOrderedProductFromCart = async () => {
    let response = await getOrderedProductDetails(shopNowProduct);
    if (response.status === 200) {
      let result = await response.json();
      setProduct(result);
    }
  };

  document.addEventListener("mouseup", (e) => {
    if (box.current && !box.current.contains(e.target)) {
      dispatch({
        type: actions.SETSHOWORDERDIALOG,
        showOrderProductDialog: false,
      });
    }
  });

  const handelOrder = async (e) => {
    e.preventDefault();

    const formdata = new FormData(e.target);

    let data = {};
    data["p_id"] = shopNowProduct;
    for (const [key, value] of formdata.entries()) {
      data[key] = value;
    }
    data["glassType"] = glasssType;

    console.log(data);
    let response = await validateProductData(
      data?.p_id,
      data?.qty,
      data?.onlyframe == undefined ? false : data?.onlyframe,
      data?.glassType
    );
    if (response.status === 200) {
      let result = await response.json();
      console.log(result);
      if (!result.success) {
        toast.info(result?.message);
      } else {
        dispatch({
          type: actions.SETORDERPRODUCTS,
          orderProducts: data,
        });

        navigate("/order");
      }
    }
  };
  useEffect(() => {
    if (shopNowProduct != null) {
      fetchOrderedProductFromCart();
    }
    return () => {
      setProduct([]);
    };
  }, [shopNowProduct]);
  return (
    <div
      ref={box}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "350px",
        minHeight: "400px",
        position: "absolute",
        zIndex: 2000,
        backgroundColor: "white",
        top: 10,
        right: 0,
        marginRight: "10px",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      }}
    >
      {showError && <i style={{ color: "red" }}>Please Fill All Info</i>}
      <section>
        <img
          src={product?.bannerImage}
          alt="#"
          style={{ width: "100px", height: "100px", objectFit: "contain" }}
        />
      </section>
      <section>
        <p style={{ fontSize: "16px" }}>
          {String(product?.p_name).length > 40
            ? String(product?.p_name).substring(0, 40) + "..."
            : product?.p_name}
        </p>
      </section>
      <section>
        <p className="price">₹{product?.p_price?.toFixed(2)}</p>
      </section>
      <section>
        <small>Availble Product {product?.p_stock}</small>
      </section>
      <form onSubmit={handelOrder}>
        <div className="input">
          <label>Qty</label>
          <input
            type="Number"
            className="form-control"
            min={1}
            name="qty"
            defaultValue={1}
          />
        </div>
        {String(product?.productDescription?.p_category).toLowerCase() !==
          "Sun Glass".toLowerCase() && (
          <>
            {String(product?.productDescription?.p_category).toLowerCase() !==
              "lens".toLowerCase() && (
              <div>
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Only Frame
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="defaultCheck1"
                  name="onlyframe"
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
                    name="left_eye_no"
                    defaultValue={0}
                    step={0.01}
                  />
                </div>
                <div className="input">
                  <label>Right Eye Number</label>
                  <input
                    type="Number"
                    className="form-control"
                    name="right_eye_no"
                    defaultValue={0}
                    step={0.01}
                  />
                </div>
                {String(
                  product?.productDescription?.p_category
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
                          onClick={() => {
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

        <button
          className="btn btn-dark mt-3 mb-3 align-self-end w-100"
          type="submit"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default ProductOrderPage;
