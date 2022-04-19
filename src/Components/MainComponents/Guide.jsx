import React from "react";

function Guide() {
  return (
    <div className="d-flex flex-column mt-2">
      <h4 className="align-self-center bg-info text-white p-2 w-100 text-center">
        How To Know your Frame Size?
      </h4>
      <section className="d-flex flex-column align-items-center">
        <h5 className="bg-dark text-white text-center p-1 ">
          Take Credit/Debit Card
        </h5>

        <figure className="figure d-flex flex-column align-items-center">
          <img
            src="credit.png"
            className="figure-img img-fluid rounded  "
            alt=""
            style={{
              objectFit: "contain",
              width: "200px",
              height: "200px",
              transform: "rotate(90deg)",
            }}
          />
          <figcaption className="figure-caption">
            This is the approximate width of a medium Eyeglass, Sunglass
          </figcaption>
        </figure>

        <small className="container text-center w-100">
          Place one tip of the card on center of your nose and touch the other
          towards the edge of eye.
        </small>
        <h6>Now Check</h6>
        <figure className="figure  d-flex flex-column align-items-center ">
          <img
            src="smallsize.webp"
            className="figure-img img-fluid rounded  "
            alt=""
            style={{
              objectFit: "contain",
              width: "200px",
              height: "200px",
            }}
          />
          <figcaption className="figure-caption">
            If card extends beyond the corner of the eye
            <br />
            <h6 className="text-center mt-1">Small Size</h6>
          </figcaption>
        </figure>
        <figure className="figure  d-flex flex-column align-items-center ">
          <img
            src="mediumsize.webp"
            className="figure-img img-fluid rounded  "
            alt=""
            style={{
              objectFit: "contain",
              width: "200px",
              height: "200px",
            }}
          />
          <figcaption className="figure-caption">
            If card roughly touches the corner of the eye
            <br />
            <h6 className="text-center mt-1">Medium Size</h6>
          </figcaption>
        </figure>
        <figure className="figure  d-flex flex-column align-items-center">
          <img
            src="largesize.webp"
            className="figure-img img-fluid rounded  "
            alt=""
            style={{
              objectFit: "contain",
              width: "200px",
              height: "200px",
            }}
          />
          <figcaption className="figure-caption">
            If card doesn't reach the corner of the eye
            <br />
            <h6 className="text-center mt-1">Large Size</h6>
          </figcaption>
        </figure>
      </section>
    </div>
  );
}

export default Guide;
