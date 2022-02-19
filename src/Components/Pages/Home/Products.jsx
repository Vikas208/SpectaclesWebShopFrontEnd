import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  fetchAllProducts,
  fetchTreandingProducts,
  fetchTotalNumberProducts,
} from "../../../API/Product";
import ProductCard from "../../MainComponents/ProductCard";
import Loader from "../../MainComponents/Loader";
import "../../../Css/ProductCard.css";

function Products() {
  const [TrendingProductsList, setTrendingProducts] = useState([]);
  const [AllProdcutsList, setAllProductsList] = useState([]);
  const [totalProducts, setTotalProduct] = useState(0);
  const [pages, setPages] = useState([]);
  const [{ limit, offset }, setValues] = useState({ limit: 8, offset: 0 });
  const [Loading, setLoading] = useState(false);
  async function fetchTrendProducts() {
    let response = await fetchTreandingProducts();
    if (response.status === 200) {
      let result = await response.json();
      setTrendingProducts(result);
    }
  }
  async function fetchProducts(limit, offset) {
    let response = await fetchAllProducts(limit, offset);
    if (response.status === 200) {
      let result = await response.json();
      setAllProductsList(result);
    }
  }
  async function fetchTotalNumberOfProducts() {
    const response = await fetchTotalNumberProducts();
    if (response.status === 200) {
      let count = await response.json();
      console.log(count);
      setTotalProduct(count);
    }
  }

  function Pagination() {
    let pages = 0;
    if (totalProducts <= 8) {
      pages = 0;
    } else {
      pages = totalProducts / 8 + (totalProducts % 8 !== 0 ? 1 : 0);
    }
    // console.log(pages);
    setPages(Array.from({ length: pages }, (n, i) => i + 1));
  }

  useEffect(() => {
    // console.log("fetch Products");
    setLoading(true);
    fetchProducts(limit, offset);
    setLoading(false);

    return () => {
      setLoading(false);
      setAllProductsList([]);
    };
  }, [limit, offset]);

  useLayoutEffect(() => {
    // console.log("Trending");
    setLoading(true);
    fetchTrendProducts();
    fetchTotalNumberOfProducts();
    setLoading(false);

    return () => {
      setTrendingProducts([]);
      setTotalProduct(0);
      setLoading(false);
    };
  }, []);

  useEffect(() => {
    // console.log("pagination");
    Pagination();
    return () => {
      setPages(0);
    };
  }, [totalProducts]);

  return (
    <>
      {Loading && <Loader />}
      <div className="container">
        {TrendingProductsList?.length !== 0 && (
          <h2 className="text-center mt-3 " style={{ color: "#575757" }}>
            Trending Products
          </h2>
        )}
        <div className="row">
          {TrendingProductsList &&
            TrendingProductsList?.map((element, index) => {
              return <ProductCard props={element} key={index} />;
            })}
        </div>
      </div>

      <div className="container">
        {AllProdcutsList?.length !== 0 && (
          <h2 className="text-center mt-3 " style={{ color: "#575757" }}>
            All Products
          </h2>
        )}
        <div className="row">
          {AllProdcutsList &&
            AllProdcutsList?.map((element, index) => {
              return <ProductCard props={element} key={index} />;
            })}
        </div>
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
                    AllProdcutsList.length < limit
                      ? { display: "none", cursor: "pointer" }
                      : { display: "block", cursor: "pointer" }
                  }
                  onClick={() => {
                    setValues((pre) => {
                      return { limit: pre.limit, offset: pre.offset + limit };
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
    </>
  );
}

export default Products;
