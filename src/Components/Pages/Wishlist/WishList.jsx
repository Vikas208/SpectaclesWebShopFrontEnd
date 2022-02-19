import React, { useLayoutEffect, useState } from "react";
import {
  CountTotalWishListProducts,
  deleteWishListItem,
  getCustomerWishList,
} from "../../../API/CustomerProduct";
import { useDataLayerValue } from "../../../DataLayer";
import WishListCard from "./WishListCard";
import { toast } from "react-toastify";

function WishList() {
  const [{ user }] = useDataLayerValue();
  const [product, setProduct] = useState([]);
  const [{ limit, offset }, setValue] = useState({ limit: 15, offset: 0 });
  const [length, setLength] = useState(0);
  const [pages, setPages] = useState(0);
  const fetchProduct = async () => {
    let response = await getCustomerWishList(user?.id, offset);
    if (response.status === 200) {
      let result = await response.json();
      setProduct(result);
    }
  };
  const CountTotalProduct = async () => {
    let response = await CountTotalWishListProducts(user?.id);
    if (response.status === 200) {
      let result = await response.json();
      setLength(result);
    }
  };

  const pagination = async () => {
    let pages = 0;
    if (length <= 5) {
      pages = 0;
    } else {
      pages = length / limit + (length % limit !== 0 ? 1 : 0);
    }
    setPages(Array.from({ length: pages }, (n, i) => i + 1));
  };

  useLayoutEffect(() => {
    user?.id != null && fetchProduct();

    return () => {
      setProduct([]);
    };
  }, [user, limit, offset]);

  useLayoutEffect(() => {
    user?.id != null && CountTotalProduct();

    return () => {
      setLength(0);
    };
  }, []);

  useLayoutEffect(() => {
    user?.id != null && pagination();
    return () => {
      setPages(0);
    };
  }, [length]);

  const deleteItem = async (id) => {
    let response = await deleteWishListItem(id);
    if (response.status === 200) {
      let Afterproduct = product.filter((element, index) => {
        return element?.id !== id;
      });
      setProduct(Afterproduct);
    } else {
      toast.error("Something is Wrong");
    }
  };
  return (
    <div>
      {product.length !== 0 &&
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
              <WishListCard props={element} />
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
  );
}
export default WishList;
