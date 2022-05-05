import React, { useLayoutEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CountFilterProducts,
  CountSearchProduct,
  fetchfilterProducts,
  SearchProduct,
} from "../../../API/Product";
import ProductCard from "../../MainComponents/ProductCard";
import Loader from "../../MainComponents/Loader";
function Searchedproducts({ isFilter = false }) {
  const {
    product,
    category,
    frameStyle,
    companyName,
    group,
    framesize,
    startingprice,
    endingprice,
  } = useParams();

  const [{ limit, offset }, setValues] = useState({ limit: 15, offset: 0 });
  const [length, setLength] = useState(0);
  const [Searchedproducts, setProducts] = useState([]);
  const [pages, setPages] = useState(0);
  const [Loading, setLoading] = useState(false);

  async function CountTotalLength() {
    let response = !isFilter
      ? await CountSearchProduct(product)
      : await CountFilterProducts(
          product,
          category,
          frameStyle,
          companyName,
          group,
          framesize,
          startingprice,
          endingprice
        );
    if (response.status === 200) {
      let result = await response.json();
      setLength(result);
      //console.log(result);
    }
  }

  async function fetchProducts() {
    setLoading(true);
    let response = !isFilter
      ? await SearchProduct(product, offset)
      : await fetchfilterProducts(
          product,
          category,
          frameStyle,
          companyName,
          group,
          framesize,
          startingprice,
          endingprice,
          offset
        );
    if (response.status === 200) {
      let result = await response.json();
      setProducts(result);
    }
    setLoading(false);
    //console.log(response);
  }

  function pagination() {
    let pages = 0;
    if (length <= limit) {
      pages = 0;
    } else {
      pages = length / limit + (length % limit !== 0 ? 1 : 0);
    }
    //console.log(pages);
    setPages(Array.from({ length: pages }, (n, i) => i + 1));
  }

  useLayoutEffect(() => {
    // //console.log("count");
    CountTotalLength();
    pagination();

    return () => {
      setLength(0);
      setPages(0);
    };
  }, [
    product,
    category,
    frameStyle,
    companyName,
    group,
    framesize,
    startingprice,
    endingprice,
  ]);
  useLayoutEffect(() => {
    // //console.log("product");
    fetchProducts();
    return () => {
      setProducts([]);
    };
  }, [
    limit,
    offset,
    product,
    category,
    frameStyle,
    companyName,
    group,
    framesize,
    startingprice,
    endingprice,
  ]);
  return (
    <>
      {Loading && <Loader />}
      {/* Products */}
      <div className="container" style={{ flex: 0.7 }}>
        {Searchedproducts.length === 0 && (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              src="https://res.cloudinary.com/dyg4mksoz/image/upload/v1644149342/CommonImages/3585596_zzq80j.png"
              alt="Not Found"
              className="img-fluid mx-auto d-block mt-5"
            />
            <span className="mt-2" style={{ fontSize: "1.5em" }}>
              Search Result Not Found
            </span>
          </div>
        )}

        {Searchedproducts.length !== 0 &&
          Searchedproducts.map((element, index) => {
            return <ProductCard props={element} isLarge={true} key={index} />;
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
                      setValues((pre) => {
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
                          setValues({ limit: 8, offset: index * limit });
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
                      Searchedproducts.length < limit
                        ? { display: "none", cursor: "pointer" }
                        : { display: "block", cursor: "pointer" }
                    }
                    onClick={() => {
                      setValues((pre) => {
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
    </>
  );
}
export default Searchedproducts;
