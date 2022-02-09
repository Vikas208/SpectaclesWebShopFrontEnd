import React from "react";

function Carousel({ carouselImages }) {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner ">
        {carouselImages && (
          <div className="carousel-item active">
            <img
              src={carouselImages[0]?.images}
              className="d-block w-100 img-fluid "
              alt="0"
            />
          </div>
        )}
        {carouselImages &&
          carouselImages?.map((element, index) => {
            if (index === 0) {
              return <pre key={index} style={{ display: "none" }}></pre>;
            }
            return (
              <div className="carousel-item" key={index}>
                <img
                  src={element?.images}
                  className="d-block w-100 img-fluid "
                  alt={index}
                />
              </div>
            );
          })}
      </div>
      <button
        className="carousel-control-prev "
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next "
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
