import React, { useEffect, useRef, useState } from "react";
import { useDataLayerValue } from "../../../DataLayer";
import { getOrderedProductDetails } from "../../../API/Product";
import { actions } from "../../../Reducer/action";

function ProductOrderPage() {
  const [{ shopNowProduct }, dispatch] = useDataLayerValue();
  const [product, setProduct] = useState([]);
  const [hide, setHide] = useState(false);
  const box = useRef(null);

  const fetchOrderedProduct = async () => {
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

  console.log(product);
  useEffect(() => {
    if (shopNowProduct != null) {
      fetchOrderedProduct();
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
        zIndex: 2,
        backgroundColor: "white",
        top: 10,
        right: 0,
        marginRight: "10px",
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      }}
    >
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
        <p className="price">
          ₹
          {(
            product?.p_price -
            product?.productSales?.saleOff -
            (product?.p_price * product?.productSales?.salePercentage) / 100
          ).toFixed(2)}
        </p>
      </section>
      <form>
        <div className="input">
          <label>Qty</label>
          <input
            type="Number"
            className="form-control"
            min={1}
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
                    defaultValue={0}
                  />
                </div>
                <div className="input">
                  <label>Right Eye Number</label>
                  <input
                    type="Number"
                    className="form-control"
                    defaultValue={0}
                  />
                </div>
                {String(
                  product?.productDescription?.p_category
                ).toLowerCase() !== "lens".toLowerCase() && (
                  <>
                    <div>
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Glass
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="glassType"
                        id="exampleRadios1"
                      />
                    </div>
                    <div>
                      <label
                        className="form-check-label"
                        htmlFor="exampleRadios1"
                      >
                        Fiber Glass
                      </label>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="glassType"
                        id="exampleRadios1"
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}

        <button className="btn btn-dark mt-3 mb-3 align-self-end w-100">
          Next
        </button>
      </form>
    </div>
  );
}

export default ProductOrderPage;
