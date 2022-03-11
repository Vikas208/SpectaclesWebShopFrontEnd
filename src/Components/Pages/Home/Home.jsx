import React, { useState, useLayoutEffect } from "react";
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
  useLayoutEffect(() => {
    loadCarousel();
    return setCarouselImages([{ images: "" }]);
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
