import React, { useLayoutEffect, useState } from "react";
import {
  fetchProductImages,
  fetchProductReviews,
  getProduct,
} from "../../../API/Product";
import Rating from "@mui/material/Rating";
import { useParams } from "react-router-dom";
import Carousel from "../../MainComponents/Carousel";

import "../../../Css/productDetails.css";
import Reviews from "../../MainComponents/Reviews";
import Reviewform from "../../MainComponents/Reviewform";
import { useDataLayerValue } from "../../../DataLayer";
import { useNavigate } from "react-router-dom";
function Product() {
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState([]);
  const [feedBack, setfeedBack] = useState(false);
  const [{ token }] = useDataLayerValue();
  const navigation = useNavigate();
  const { id } = useParams();

  async function fetchReviews() {
    let response = await fetchProductReviews(id);
    if (response.status === 200) {
      let result = await response.json();
      setReviews(result);
    }
  }
  async function fetchImages() {
    let response = await fetchProductImages(id);
    if (response.status === 200) {
      let result = await response.json();
      setImages(result);
    }
  }
  async function fetchProduct() {
    let response = await getProduct(id);
    console.log(response);
    if (response.status === 200) {
      let result = await response.json();

      setProduct(result);
    }
  }

  useLayoutEffect(() => {
    fetchReviews();
    fetchImages();
    fetchProduct();
  }, []);

  return (
    <div className="productDetails">
      <div className="product">
        {/* carousel */}
        {images && (
          <div className="images">
            {images.length !== 0 ? (
              <Carousel carouselImages={images} />
            ) : (
              <img
                src={product?.bannerImage}
                alt="product"
                className="img-fluid "
              />
            )}
          </div>
        )}
        {/* product basic info */}
        {product.length !== 0 && (
          <div className="product_info container">
            <h3>{product?.p_name}</h3>
            <span>{product?.productDescription?.p_description}</span>
            {/* price */}
            {product?.productSales?.saleOff !== 0 && (
              <div
                className="container d-flex flex-column justify-content-start align-items-start"
                style={{ fontSize: "2em", letterSpacing: "1.5px" }}
              >
                <span style={{ margin: "0.6px" }}>
                  ₹
                  {(product?.p_price - product?.productSales?.saleOff).toFixed(
                    2
                  )}
                </span>

                <span
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationThickness: "3px",
                    fontSize: "0.5em",
                    margin: "0.6px",
                  }}
                >
                  ₹{product?.p_price}
                </span>

                <span style={{ fontSize: "0.5em", margin: "0.6px" }}>
                  ₹{product?.productSales?.saleOff} OFF
                </span>
              </div>
            )}
            {product?.productSales?.salePercentage !== 0 && (
              <div
                className="d-flex flex-column justify-content-start align-items-start"
                style={{ fontSize: "2em", letterSpacing: "1.5px" }}
              >
                <span>
                  ₹
                  {(
                    product?.p_price -
                    product?.p_price *
                      (product?.productSales?.salePercentage / 100)
                  ).toFixed(2)}
                </span>
                <span
                  style={{
                    textDecorationLine: "line-through",
                    textDecorationThickness: "2px",
                    fontSize: "0.5em",
                    margin: "0.6px",
                  }}
                >
                  ₹{product?.p_price}
                </span>
                <span style={{ fontSize: "0.5em", margin: "0.6px" }}>
                  Save ₹
                  {(
                    product?.p_price *
                    (product?.productSales?.salePercentage / 100)
                  ).toFixed(2)}
                </span>
              </div>
            )}

            {product?.productSales?.saleOff === 0 &&
              product?.productSales?.salePercentage === 0 && (
                <span style={{ fontSize: "2em", margin: "0.6px" }}>
                  ₹{product?.p_price}
                </span>
              )}
            {product?.rating !== 0 && (
              <Rating
                name="rating"
                size="large"
                defaultValue={product?.rating}
                precision={0.5}
                readOnly
              />
            )}
            {product?.p_stock === 0 ? (
              <span style={{ color: "red", fontSize: "2em" }}>
                Out Of Stock
              </span>
            ) : (
              <span>Available Products are {product?.p_stock}</span>
            )}
            <div>
              <button className="btn_product">
                <span>Add To Cart</span>
                <span className="material-icons">shopping_cart</span>
              </button>
              <button className="btn_product">
                <span>Add to WishList</span>
                <span className="material-icons">favorite_border</span>
              </button>
              <button className="btn_product">
                <span>Shop now</span>
                <span className="material-icons-sharp">shopping_bag</span>
              </button>
              <div>
                <button
                  className="btn_product"
                  onClick={() => {
                    token ? setfeedBack((pre) => !pre) : navigation("/login");
                  }}
                >
                  <span>Feedback</span>
                  <span className="material-icons-sharp">feedback</span>
                </button>
                {feedBack && <Reviewform p_id={product?.id} />}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* description */}
      {product?.productDescription && (
        <div className="container">
          <h5>Details</h5>
          <table
            className="table table-borderless"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
            }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Company Name</th>
                <td>{product?.productDescription?.company_name}</td>
              </tr>
              <tr>
                <th scope="row">Categories</th>
                <td>{product?.productDescription?.p_category}</td>
              </tr>
              <tr>
                <th scope="row">Frame Style</th>
                <td>{product?.productDescription?.p_frameStyle}</td>
              </tr>
              <tr>
                <th scope="row">Group</th>
                <td>{product?.productDescription?.p_group}</td>
              </tr>
              <tr>
                <th scope="row">Frame Size</th>
                <td>{product?.productDescription?.p_frameSize}</td>
              </tr>
              <tr>
                <th scope="row">Color</th>
                <td>{product?.productDescription?.color}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* Reviews */}
      {reviews.length !== 0 && (
        <div className="container">
          <h5>Reviews</h5>
          <div className="d-flex flex-wrap justify-content-start align-items-start">
            {reviews.map((element, index) => {
              return <Reviews review={element} key={index} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Product;
