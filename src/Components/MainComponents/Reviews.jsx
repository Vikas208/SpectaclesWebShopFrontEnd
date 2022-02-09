import React from "react";
import { Rating } from "@mui/material";

import "../../Css/reviews.css";
import { useDataLayerValue } from "../../DataLayer";
function Reviews({ review }) {
  const [{ user }] = useDataLayerValue();
  return (
    <div className="reviews">
      <div className="user d-flex align-items-center">
        <span className="material-icons-outlined">account_circle</span>

        <span>{review?.user === user.mailId ? "You" : review?.user}</span>
      </div>
      <div>
        {" "}
        <Rating
          size="medium"
          defaultValue={review.rating ? review?.rating : 0}
          precision={0.5}
          readOnly
        />
      </div>
      <span>{review?.feedBack}</span>
    </div>
  );
}

export default Reviews;
