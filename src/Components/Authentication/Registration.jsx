import React, { useRef, useState } from "react";
import { SaveUser } from "../../API/User";
import { isValidMailId } from "../../Validation/MailValidation";
import "../../ComponentsCss/registration.css";
import { GenerateOtp } from "../../API/Otp";

import { toast } from "react-toastify";
// Register Component [Sign Up]

export default function Register() {
  const mail = useRef("");
  const password = useRef("");
  const cpassword = useRef("");
  const name = useRef("");
  const otp = useRef("");

  // OTP
  const [otpdata, setOtp] = useState({ otp: "", time: "" });

  // Generate OTP
  const handelOTP = async () => {
    if (
      mail.current.value === "" ||
      name.current.value === "" ||
      password.current.value === "" ||
      cpassword.current.value === ""
    ) {
      toast.info("Please Fill All Information");
      return;
    } else if (isValidMailId(mail.current.value) === null) {
      toast.warning("Not valid Mail Id");
      return;
    }

    otp.current.disabled = false;
    document.getElementById("sendotpbutton").disabled = true;

    let mailId = String(mail.current.value).toLowerCase();
    let response = await GenerateOtp(mailId, "sendMail");
    let data = await response.json();

    if (data.otp !== undefined || data.otp !== null) {
      setOtp({ otp: data.otp, time: data.otpTime });
      toast.success("Otp Sent On your Mail Id");
    } else {
      toast.error("Mail Not Sent Try Again");
      otp.current.disabled = true;
      document.getElementById("sendotpbutton").disabled = false;
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    if (String(password.current.value).length < 6) {
      toast.warning("Please Enter Atleast 6 Character Password");
      return;
    } else if (cpassword.current.value !== password.current.value) {
      toast.warning("Invalid Credentials");
      return;
    } else if (otp.current.value === "") {
      toast.warning("Verify Mail Id");
      return;
    } else if (
      otp.current.value === otpdata.otp &&
      new Date(Date.now()) <= new Date(Number(otpdata.time) + 300000)
    ) {
      let user = {
        mailId: String(mail.current.value).toLowerCase(),
        name: name.current.value,
        password: password.current.value,
      };

      let result = await SaveUser(user);
      let response = await result.json();
      response.success
        ? toast.success(response.message)
        : toast.error(response.message);
    } else {
      toast.error("Invalid Credentials");
    }
  };
  return (
    <div className="Register">
      <div className="shadow">
        <div className="img">
          <img
            src="https://drive.google.com/uc?export=view&id=1CazG8Gh2zBwT5ZcV5K5ggZaLeDd8JYN3"
            alt="Shop"
          />
        </div>
        <div className="inputItems">
          <form className="form" onSubmit={handelSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter Your User Name"
              ref={name}
              required
              onChange={() => {
                name.current.style.border = "1px solid green";
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Mail Id"
              ref={mail}
              autoComplete="username"
              required
              onChange={() => {
                isValidMailId(mail.current.value) === null
                  ? (mail.current.style.border = "1px solid red")
                  : (mail.current.style.border = "1px solid green");
              }}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Your Password"
              autoComplete="new-password"
              ref={password}
              required
              onChange={() => {
                String(password.current.value).length < 6
                  ? (password.current.style.border = "1px solid red")
                  : (password.current.style.border = "1px solid green");
              }}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter Your Confirm Password"
              ref={cpassword}
              autoComplete="new-password"
              required
              onChange={() => {
                if (cpassword.current.value !== password.current.value) {
                  cpassword.current.style.border = "1px solid red";
                } else {
                  cpassword.current.style.border = "1px solid green";
                }
              }}
            />
            <input
              type="text"
              name="otp"
              id="otp"
              placeholder="Enter Otp Sended on Provided Email"
              ref={otp}
              required
              disabled
            />

            <button
              type="button"
              className="sendOtp"
              id="sendotpbutton"
              onClick={handelOTP}
            >
              Verify Mail
            </button>
            <button type="submit" className="submit">
              SIGN UP
            </button>
          </form>
          <div className="links">
            <a href="/login">If You Have Already An Account Go For Login!</a>
          </div>
        </div>
      </div>
    </div>
  );
}
