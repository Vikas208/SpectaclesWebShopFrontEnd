import React, { useRef, useState } from "react";
import { LoginUser } from "../../API/User";
import "../../Css/registration.css";
import { isValidMailId } from "../../Validation/MailValidation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDataLayerValue } from "../../DataLayer";
import { actions } from "../../Reducer/action";
import { LOGINIMAGE } from "../../API/ImageLink";
import Loader from "../MainComponents/Loader";
// Login [Sign In]
export default function Login() {
  const mail = useRef("");
  const password = useRef("");
  const [, dispatch] = useDataLayerValue();
  const [Loading, setLoading] = useState(false);

  const navigation = useNavigate();
  const handelSubmit = async (e) => {
    e.preventDefault();
    if (isValidMailId(String(mail.current.value)) === null) {
      toast.error("Invalid Credentials");
      return;
    }
    setLoading(true);
    let data = {
      mailId: String(mail.current.value).toLowerCase(),
      password: password.current.value,
      hasRole: "user",
    };
    let response = await LoginUser(data);
    if (response.status !== 500) {
      let result = await response.json();
      if (response.status === 200) {
        dispatch({
          type: actions.SET_TOKEN,
          token: result.token,
        });
        dispatch({
          type: actions.SET_USER,
          user: {
            id: result.userDetails.id,
            name: result.userDetails.name,
            mailId: result.userDetails.mailId,
          },
        });
        setLoading(false);
        navigation("/");
      } else {
        setLoading(false);
        toast.error(result.message);
      }
    } else {
      setLoading(false);
      toast.error("Something is wrong");
    }
  };
  return (
    <div className="Login">
      {Loading && <Loader />}

      <div className="shadow">
        <div className="inputItems">
          <form className="form" onSubmit={handelSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Mail Id"
              required
              ref={mail}
              autoComplete="username"
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
              required
              ref={password}
              autoComplete="current-password"
              onChange={() => {
                String(password.current.value).length < 6
                  ? (password.current.style.border = "1px solid red")
                  : (password.current.style.border = "1px solid green");
              }}
            />
            <button type="submit" className="submit">
              SIGN IN
            </button>
          </form>
          <div className="links loginLinks">
            <a href="/forgot">Forgot Password ?</a> <br />
            <a href="/register">Create An Account if not created </a>
          </div>
        </div>
        <div className="img">
          <img src={LOGINIMAGE} alt="Shop" />
        </div>
      </div>
    </div>
  );
}
