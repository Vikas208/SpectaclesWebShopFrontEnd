import React, { useLayoutEffect, useState } from "react";
import { getCustomerCart } from "../../../API/CustomerProduct";
import { useDataLayerValue } from "../../../DataLayer";
import CartProduct from "./CartProduct";
import { deleteCartItem } from "../../../API/CustomerProduct";
import "../../../Css/cartproduct.css";
import { actions } from "../../../Reducer/action";
import ProductPricing from "./ProductPricing";
import "../../../Css/cartproduct.css";
function Cart() {
  const [{ NumberOfCartProducts, user }, dispatch] = useDataLayerValue();
  const [{ limit, offset }, setValue] = useState({ limit: 5, offset: 0 });
  const [product, setProducts] = useState([]);
  const [pages, setPages] = useState([]);

  const fetchProduct = async () => {
    let response = await getCustomerCart(user?.id, limit, offset);
    console.log(response);
    if (response.status === 200) {
      let result = await response.json();
      setProducts(result);
    }
  };
  const deleteItem = async (id) => {
    // e.preventDefault();
    let response = await deleteCartItem(id);
    if (response.status === 200) {
      let result = await response.json();
      console.log(result);
      let updatedproducts = product.filter((element) => {
        return element?.id !== id;
      });
      setProducts(updatedproducts);
      dispatch({
        type: actions.SETCART,
        NumberOfCartProducts: NumberOfCartProducts - 1,
      });
      dispatch({
        type: actions.RELOADCARTPRICING,
        reloadCartPricing: true,
      });
    }
  };
  const pagination = async () => {
    let pages = 0;
    if (NumberOfCartProducts <= 5) {
      pages = 0;
    } else {
      pages =
        NumberOfCartProducts / limit +
        (NumberOfCartProducts % limit !== 0 ? 1 : 0);
    }
    setPages(Array.from({ length: pages }, (n, i) => i + 1));
  };
  useLayoutEffect(() => {
    if (user?.id != null) fetchProduct();
  }, [user, limit, offset]);

  useLayoutEffect(() => {
    if (user?.id != null) pagination();
  }, [product, NumberOfCartProducts]);

  return (
    <div className="cart ">
      <h1 className="text-center m-3">Your Cart</h1>
      <div className="d-flex flex-wrap justify-content-center cart_window  ">
        <div className="d-flex flex-column cart_products" style={{ flex: 0.7 }}>
          <div className="d-flex flex-wrap m-3 align-items-center ">
            {product?.length !== 0 &&
              product.map((element, index) => {
                return (
                  <div
                    className="_card"
                    style={{
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    key={index}
                  >
                    <CartProduct props={element} />
                    <span
                      className="material-icons mt-2"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        deleteItem(element?.id);
                      }}
                    >
                      close
                    </span>
                  </div>
                );
              })}
            {product?.length === 0 && (
              <small className="text-center w-100 " style={{ color: "red" }}>
                No Items are there!
              </small>
            )}
          </div>

          {pages.length > 0 && (
            <div className="container d-flex justify-content-center align-items-center">
              <nav>
                <ul className="pagination">
                  <li className="page-item">
                    <span
                      className="page-link"
                      style={
                        offset === 0
                          ? { display: "none", cursor: "pointer" }
                          : { display: "block", cursor: "pointer" }
                      }
                      onClick={() => {
                        setValue((pre) => {
                          return {
                            limit: pre.limit,
                            offset: pre.offset - limit,
                          };
                        });
                      }}
                    >
                      Previous
                    </span>
                  </li>
                  {pages.map((element, index) => {
                    return (
                      <li className="page-item" key={index}>
                        <span
                          className="page-link"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setValue({ limit: limit, offset: index * limit });
                          }}
                        >
                          {element}
                        </span>
                      </li>
                    );
                  })}
                  <li className="page-item">
                    <span
                      className="page-link"
                      style={
                        product?.length < limit
                          ? { display: "none", cursor: "pointer" }
                          : { display: "block", cursor: "pointer" }
                      }
                      onClick={() => {
                        setValue((pre) => {
                          return {
                            limit: pre.limit,
                            offset: pre.offset + limit,
                          };
                        });
                      }}
                    >
                      Next
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
        <div
          className="d-flex container justify-content-center pricing_product"
          style={{ flex: "0.3" }}
        >
          {product?.length !== 0 && <ProductPricing />}
        </div>
      </div>
    </div>
  );
}

export default Cart;
