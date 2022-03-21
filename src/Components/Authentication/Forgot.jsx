import React, { useRef, useState } from "react";
import "../../Css/registration.css";
import { isValidMailId } from "../../Validation/MailValidation";
import { GenerateOtp, ValidateOtp } from "../../API/Otp";
import { ResetPassword } from "../../API/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RESETPASSWORDIMAGE } from "../../API/ImageLink";
function Forgot() {
  const mail = useRef("");
  const otp = useRef("");
  const password = useRef("");
  const cpassword = useRef("");
  const [reset, setReset] = useState(false);

  const navigate = useNavigate();
  const handelOtp = async (e) => {
    if (
      mail.current.value === "" ||
      isValidMailId(mail.current.value) === null
    ) {
      toast.error("Invalid Credentials");
      return;
    }

    //disabled the mail id field and send otp button
    //opt input will be now editable
    mail.current.disabled = true;
    otp.current.disabled = false;
    e.target.disabled = true;

    let mailId = String(mail.current.value).toLowerCase();
    let response = await GenerateOtp(mailId, "forgotPassword");

    if (response.status === 200) {
      let result = await response.json();
      result.success
        ? toast.success(result.message)
        : toast.error(result.message);
    } else {
      toast.error("Something is Wrong");
      //Make Editable the mail id field and send otp button
      //opt input will be now Disabled
      mail.current.disabled = false;
      otp.current.disabled = true;
      e.target.disabled = false;
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    let response = await ValidateOtp(mail.current.value, otp.current.value);

    if (response.status === 200) {
      let success = await response.json();
      if (success) {
        setReset(true);
      } else {
        toast.error("Bad Credentials");
      }
    }
  };

  const handelReset = async (e) => {
    e.preventDefault();
    if (password.current.value !== cpassword.current.value) {
      toast.error("Invalid Credentials");
      return;
    }
    let data = {
      mailId: mail.current.value,
      password: password.current.value,
      hasRole: "user",
    };
    let response = await ResetPassword(data);
    if (response.status !== 500) {
      let result = await response.json();
      // console.log(result);
      result.success
        ? toast.success(result.message)
        : toast.error(result.message);
    } else {
      toast.error(response.message);
    }
    navigate("/login");
  };
  return (
    <div className="forgot">
      <div
        className="shadow"
        style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
      >
        <div className="img">
          <img src={RESETPASSWORDIMAGE} alt="Forgot" />
        </div>
        <form className="form" onSubmit={handelSubmit}>
          <input
            type="email"
            name="mail"
            placeholder="Enter Your Mail Id"
            required
            ref={mail}
            onChange={() => {
              isValidMailId(mail.current.value) === null
                ? (mail.current.style.border = "1px solid red")
                : (mail.current.style.border = "1px solid green");
            }}
          />
          <button type="button" className="sendOtp" onClick={handelOtp}>
            Send OTP
          </button>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            required
            disabled
            ref={otp}
          />

          <button
            type="submit"
            className="submit"
            style={{ backgroundColor: "#0d0d0c" }}
          >
            Reset Password
          </button>
        </form>

        {reset && (
          <form
            className="form"
            style={{ marginTop: "20px" }}
            onSubmit={handelReset}
          >
            <input
              type="password"
              name="password"
              placeholder="Enter New Password"
              autoComplete="new-password"
              minLength={6}
              required
              ref={password}
              onChange={() => {
                String(password.current.value).length < 6
                  ? (password.current.style.border = "1px solid red")
                  : (password.current.style.border = "1px solid green");
              }}
            />
            <input
              type="password"
              name="cpassword"
              placeholder="Enter Confirm Password"
              autoComplete="new-password"
              minLength={6}
              required
              ref={cpassword}
              onChange={() => {
                if (cpassword.current.value !== password.current.value) {
                  cpassword.current.style.border = "1px solid red";
                } else {
                  cpassword.current.style.border = "1px solid green";
                }
              }}
            />
            <button type="submit" className="submit">
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Forgot;
