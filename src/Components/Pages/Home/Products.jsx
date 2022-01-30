import React, { useEffect, useState } from "react";
import { fetchAllProducts, fetchTreandingProducts } from "../../../API/Product";
import { useDataLayerValue } from "../../../DataLayer";
import { actions } from "../../../Reducer/action";
import ProductCard from "../../MainComponents/ProductCard";
import Loader from "../../MainComponents/Loader";
function Products() {
  const [{ TrendingProductsList, AllProdcutsList }, dispatch] =
    useDataLayerValue();

  const [Loading, setLoading] = useState(false);
  async function fetchTreandProducts() {
    let response = await fetchTreandingProducts();
    if (response.status === 200) {
      let result = await response.json();
      dispatch({
        type: actions.SET_TRENDINGPRODUCTS,
        TrendingProductsList: result,
      });
    }
  }
  async function fetchProducts() {
    let response = await fetchAllProducts(10, 0);
    if (response.status === 200) {
      let result = await response.json();
      dispatch({
        type: actions.SET_ALLPRODUCTS,
        AllProdcutsList: result,
      });
    }
  }
  useEffect(() => {
    setLoading(true);
    fetchTreandProducts();
    fetchProducts();
    setLoading(false);
  }, []);
  return (
    <>
      {Loading && <Loader />}
      <div className="container">
        {TrendingProductsList && (
          <h4 className="text-center mt-3 " style={{ color: "#575757" }}>
            Trending Products
          </h4>
        )}
        <div className="row">
          {TrendingProductsList &&
            TrendingProductsList.map((element, index) => {
              return <ProductCard props={element} key={index} />;
            })}
        </div>
      </div>

      <div className="container">
        {AllProdcutsList && (
          <h4 className="text-center mt-3 " style={{ color: "#575757" }}>
            All Products
          </h4>
        )}
        <div className="row">
          {AllProdcutsList &&
            AllProdcutsList.map((element, index) => {
              return <ProductCard props={element} key={index} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Products;
