import React, { useRef } from "react";
import { LoginUser } from "../../API/User";
import "../../ComponentsCss/registration.css";
import { isValidMailId } from "../../Validation/MailValidation";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Login [Sign In]
export default function Login() {
  const mail = useRef("");
  const password = useRef("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (
      isValidMailId(String(mail.current.value)) === null ||
      String(password.current.value).length < 6
    ) {
      toast.error("Invalid Credentials");
      return;
    }
    let data = {
      mailId: mail.current.value,
      password: password.current.value,
    };
    let response = await LoginUser(data);
    let result = await response.json();

    console.log(result);
    console.log(result.message);
    result.success
      ? toast.success(result.message)
      : toast.error(result.message);
  };
  return (
    <div className="Login">
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
          <img
            src="https://drive.google.com/uc?export=view&id=1CazG8Gh2zBwT5ZcV5K5ggZaLeDd8JYN3"
            alt="Shop"
          />
        </div>
      </div>
    </div>
  );
}
