import { Rating } from "@mui/material";
import React, { useRef, useState } from "react";
import { saveFeedback } from "../../API/Product";
import { useDataLayerValue } from "../../DataLayer";
import { toast } from "react-toastify";
function Reviewform({ p_id }) {
  const [rating, setRating] = useState(0);

  const feedback = useRef("");
  const [{ user }] = useDataLayerValue();

  const SaveUserFeedBack = async (e) => {
    // e.preventDefault();
    document.getElementById("reviewForm").style.display = "none";
    e.preventDefault();
    if (rating === 0 && feedback.current.value === "") {
      return;
    }
    let data = {
      p_id,
      c_id: user?.id,
      rating: rating,
      feedBack: feedback.current.value,
    };
    //console.log(data);
    let response = await saveFeedback(data);
    if (response.status === 200) {
      let message = await response.json();
      toast.info(message?.message);
    }
  };
  return (
    <div className="container" id="reviewForm">
      <form
        className="d-inline-flex flex-column justify-content-center align-items-center"
        onSubmit={SaveUserFeedBack}
      >
        <Rating
          defaultValue={0}
          value={rating}
          size="large"
          precision={0.5}
          onChange={(e, value) => {
            setRating(value);
          }}
        />
        <textarea
          className="form-control"
          name="feedback"
          cols="20"
          rows="4"
          ref={feedback}
        ></textarea>

        <button type="submit" className="btn btn-primary mt-1 me-1 ">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Reviewform;
