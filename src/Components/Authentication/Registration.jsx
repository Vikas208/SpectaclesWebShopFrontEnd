import React, { useRef, useState } from "react";
import { SaveUser } from "../../API/User";
import { isValidMailId } from "../../Validation/MailValidation";
import "../../Css/registration.css";
import { GenerateOtp, ValidateOtp } from "../../API/Otp";
import { toast } from "react-toastify";
import { useDataLayerValue } from "../../DataLayer";
import { actions } from "../../Reducer/action";
import { useNavigate } from "react-router-dom";
import { LOGINIMAGE } from "../../API/ImageLink";
import Loader from "../MainComponents/Loader";
// Register Component [Sign Up]

export default function Register() {
  const mail = useRef("");
  const password = useRef("");
  const cpassword = useRef("");
  const name = useRef("");
  const otp = useRef("");

  const [Loading, setLoading] = useState(false);

  const [, dispatch] = useDataLayerValue();
  const navigation = useNavigate();

  // Generate OTP
  const handelOTP = async () => {
    if (
      mail.current.value === "" ||
      name.current.value === "" ||
      password.current.value === "" ||
      cpassword.current.value === "" ||
      String(password.current.value).length < 6 ||
      password.current.value !== cpassword.current.value
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
    if (response.status === 200) {
      let result = await response.json();
      result.success
        ? toast.success(result.message)
        : toast.error(result.message);
    } else {
      toast.error("Something is Wrong");
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    if (otp.current.value === "") {
      toast.warning("Verify Mail Id");
    }

    let response = await ValidateOtp(mail.current.value, otp.current.value);

    setLoading(true);
    if (response.status === 200) {
      let success = await response.json();

      if (success) {
        let user = {
          mailId: String(mail.current.value).toLowerCase(),
          name: name.current.value,
          password: password.current.value,
          hasRole: "user",
        };

        let result = await SaveUser(user);

        if (result.status !== 500) {
          let response = await result.json();
          if (result.status === 200) {
            if (response.success) {
              dispatch({
                type: actions.SET_TOKEN,
                token: response.token,
              });
              dispatch({
                type: actions.SET_USER,
                user: {
                  id: response.userDetails.id,
                  name: response.userDetails.name,
                  mailId: response.userDetails.mailId,
                },
              });

              navigation("/");
            } else {
              toast.warning(response.message);
            }
          } else {
            toast.error(response.message);
          }
        } else {
          setLoading(false);
          toast.error("Invalid Credentials");
        }
      } else {
        toast.error("Bad Credentials");
      }
    }
    setLoading(false);
    window.location.reload();
  };

  return (
    <div className="Register">
      {Loading && <Loader />}
      <div className="shadow">
        <div className="img">
          <img src={LOGINIMAGE} alt="Shop" />
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
              minLength={6}
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
              minLength={6}
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
