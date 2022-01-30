import React from "react";
import "../../Css/ProductCard.css";
import ReactStars from "react-rating-stars-component";
function ProductCard(props) {
  return (
    <div className="productCard col">
      {/* Image */}
      {/* Name */}
      {/* Ratings */}
      {/* Shop Now Button */}
      {/* Add to cart */}
      {/* add to wishlist */}
      <img src={props.props.p_bannerImage} alt="#" />
      <span>{props.props.p_name}</span>
      <ReactStars
        count={5}
        size={24}
        activeColor="#ffd700"
        value={props.props.rating}
      />
      <button>Shop now</button>
      <section className="productcard_footer">
        <span className="material-icons-outlined">favorite_border</span>
        <span className="material-icons-outlined">shopping_cart</span>
      </section>
    </div>
  );
}

export default ProductCard;
