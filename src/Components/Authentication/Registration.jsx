import React, { useRef, useState } from "react";
import { SaveUser } from "../../API/User";
import { isValidMailId } from "../../Validation/MailValidation";
import "../../Css/registration.css";
import { GenerateOtp } from "../../API/Otp";
import { toast } from "react-toastify";
import { useDataLayerValue } from "../../DataLayer";
import { actions } from "../../Reducer/action";
import { useNavigate } from "react-router-dom";
import { IMAGE } from "../../API/ImageLink";
// Register Component [Sign Up]

export default function Register() {
  const mail = useRef("");
  const password = useRef("");
  const cpassword = useRef("");
  const name = useRef("");
  const otp = useRef("");

  const [, dispatch] = useDataLayerValue();
  const navigation = useNavigate();
  // OTP
  const [otpdata, setOtp] = useState({ otp: "", time: "" });

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
    if (response.status !== 500) {
      let data = await response.json();

      if (response.status === 200) {
        toast.success("Otp Sent On your Mail Id");
        setOtp({ otp: data.otp, time: data.otpTime });
      } else {
        toast.error("Mail Not Sent Try Again");
        otp.current.disabled = true;
        document.getElementById("sendotpbutton").disabled = false;
      }
    } else {
      toast.error("Something is Wrong");
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    if (otp.current.value === "") {
      toast.warning("Verify Mail Id");
    } else if (new Date(Date.now()) > new Date(Number(otpdata.time) + 300000)) {
      toast.warning("Otp Expired");
    } else if (cpassword.current.value !== password.current.value) {
      toast.warning("Invalid Credentials");
    } else if (otp.current.value === otpdata.otp) {
      let user = {
        mailId: String(mail.current.value).toLowerCase(),
        name: name.current.value,
        password: password.current.value,
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
                id: null,
                name: name.current.value,
                mailId: mail.current.value,
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
        toast.error("Invalid Credentials");
      }
      window.location.reload();
    }
  };
  return (
    <div className="Register">
      <div className="shadow">
        <div className="img">
          <img src={IMAGE + "1CazG8Gh2zBwT5ZcV5K5ggZaLeDd8JYN3"} alt="Shop" />
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
