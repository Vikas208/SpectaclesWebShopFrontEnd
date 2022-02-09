import React, { useState, useEffect } from "react";
import Carousel from "../../MainComponents/Carousel";
import Products from "./Products";
import { LoadCarousel } from "../../../API/LoadShopDetails";
function Home() {
  const [carouselImages, setCarouselImages] = useState([{ images: "" }]);
  const loadCarousel = async () => {
    let response = await LoadCarousel();
    if (response.status === 200) {
      let result = await response.json();
      setCarouselImages(result);
    }
  };
  useEffect(() => {
    loadCarousel();
  }, []);
  return (
    <div>
      {carouselImages.length !== 0 && (
        <Carousel carouselImages={carouselImages} />
      )}
      <Products />
    </div>
  );
}

export default Home;
