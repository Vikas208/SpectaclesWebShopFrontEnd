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
import { saveToCart, saveToWishList } from "../../../API/CustomerProduct";
import { useNavigate } from "react-router-dom";
import { actions } from "../../../Reducer/action";
import { toast } from "react-toastify";

function Product() {
  const [reviews, setReviews] = useState([]);
  const [images, setImages] = useState([]);
  const [product, setProduct] = useState([]);
  const [feedBack, setfeedBack] = useState(false);
  const [{ token, user, NumberOfCartProducts }, dispatch] = useDataLayerValue();
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

  const handelSaveToCart = async () => {
    let data = {
      common_id: user?.id,
      p_id: product?.id,
    };
    let response = await saveToCart(data);
    if (response.status === 200) {
      dispatch({
        type: actions.SETCART,
        NumberOfCartProducts: NumberOfCartProducts + 1,
      });
    } else {
      toast.error("Something is Wrong");
    }
  };
  const handelSaveToWishList = async () => {
    let data = {
      common_id: user?.id,
      p_id: product?.id,
    };
    let response = await saveToWishList(data);
    if (response.status !== 200) {
      toast.error("Something is wrong");
    }
  };

  useLayoutEffect(() => {
    fetchProduct();
    fetchImages();
    fetchReviews();

    return () => {
      setReviews([]);
      setImages([]);
      setProduct([]);
    };
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

            <div className="container d-flex flex-column align-items-left">
              <span style={{ fontSize: "24px" }}>
                ₹
                {(
                  product?.p_price -
                  product?.productSales.saleOff -
                  (product?.p_price * product?.productSales?.salePercentage) /
                    100
                ).toFixed(2)}
              </span>

              {product?.productSales?.saleOff !== 0 ||
                (product?.productSales?.salePercentage !== 0 && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      fontSize: "18px",
                      textDecorationThickness: "2px",
                    }}
                  >
                    ₹{product?.p_price}
                  </span>
                ))}
              {product?.productSales?.saleOff !== 0 ||
                (product?.productSales?.salePercentage !== 0 && (
                  <span style={{ fontSize: "20px" }}>
                    Save ₹
                    {(
                      product?.productSales?.saleOff +
                      (product?.p_price *
                        product?.productSales?.salePercentage) /
                        100
                    ).toFixed(2)}
                  </span>
                ))}
            </div>

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
              <button
                className="btn_product"
                onClick={(e) => {
                  token ? handelSaveToCart() : navigation("/login");
                }}
              >
                <span className="material-icons">shopping_cart</span>
                <span>Add To Cart</span>
              </button>
              <button
                className="btn_product"
                onClick={() => {
                  token ? handelSaveToWishList() : navigation("/login");
                }}
              >
                <span className="material-icons">favorite_border</span>
                <span>Add to WishList</span>
              </button>
              <button className="btn_product">
                <span className="material-icons-sharp">shopping_bag</span>
                <span>Shop now</span>
              </button>
              <div>
                <button
                  className="btn_product"
                  onClick={() => {
                    token ? setfeedBack((pre) => !pre) : navigation("/login");
                  }}
                >
                  <span className="material-icons-sharp">feedback</span>
                  <span>Feedback</span>
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
          <h5>Product Description</h5>
          <table className="table">
            <thead className="table table-borderless">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody className="table-light">
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
