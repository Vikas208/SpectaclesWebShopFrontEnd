import React, { useRef, useState } from "react";
import { UpdateName } from "../../../API/UpdateData";
import { useDataLayerValue } from "../../../DataLayer";
import { toast } from "react-toastify";
import { actions } from "../../../Reducer/action";
import { ValidateUser } from "../../../API/User";
import { ResetPassword } from "../../../API/User";
import "../../../Css/account.css";
function Profile() {
  const [{ token, user }, dispatch] = useDataLayerValue();
  const [isVisible, setVisible] = useState(false);
  const username = useRef("");
  const currentpassword = useRef("");
  const newpassword = useRef("");
  const cpassword = useRef("");

  const handelChangeName = async (e) => {
    e.preventDefault();
    if (!username.current.disabled) {
      if (username.current.value === user.name) {
        username.current.disabled = true;
        e.target.innerText = "Change Name";
        return;
      }
      let data = {
        mailId: user?.mailId,
        name: username.current.value,
      };
      console.log(token);
      let response = await UpdateName(data);
      if (response.status === 200) {
        let result = await response.json();
        toast.success(result.message);
        dispatch({
          type: actions.SET_USER,
          user: { ...user, name: username.current.value },
        });
        username.current.disabled = true;
        e.target.innerText = "Change Name";
        return;
      } else {
        toast.error("something is wrong");
        username.current.value = user.name;
        username.current.disabled = true;
        e.target.innerText = "Change Name";
        return;
      }
    }
    username.current.disabled = false;
    e.target.innerText = "Update Name";
  };
  const handelSubmit = async (e) => {
    e.preventDefault();

    if (newpassword.current.value !== cpassword.current.value) {
      return;
    }
    let data = {
      mailId: user?.mailId,
      password: currentpassword.current.value,
    };
    let response = await ValidateUser(data);
    if (response.status !== 500) {
      let res = await response.json();
      if (response.status === 200) {
        // Update Password
        let data = {
          mailId: user?.mailId,
          password: newpassword.current.value,
        };
        let result = await ResetPassword(data);
        if (result.status !== 500) {
          let resp = await result.json();
          resp.success
            ? toast.success(resp.message)
            : toast.error(resp.message);
        } else {
          toast.error("Something is wrong");
        }
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error("Something is wrong");
    }
    setVisible(!isVisible);
  };
  return (
    <div className="profile">
      <div className="profile_form">
        <input type="email" defaultValue={user?.mailId} disabled required />
        <input
          type="text"
          defaultValue={user?.name}
          disabled
          ref={username}
          required
        />
        <button className="profile_button" onClick={handelChangeName}>
          Change Name
        </button>
      </div>
      <div className="profile_form">
        <button
          className="profile_button"
          onClick={() => {
            setVisible(!isVisible);
          }}
        >
          Change Password
        </button>
      </div>
      {isVisible && (
        <form className="profile_form" onSubmit={handelSubmit}>
          <input
            type="password"
            ref={currentpassword}
            placeholder="Enter Old Password"
            required
          />
          <input
            type="password"
            ref={newpassword}
            autoComplete="newpassword"
            placeholder="Enter New Password"
            required
            minLength={6}
            onChange={() => {
              String(newpassword.current.value).length < 6
                ? (newpassword.current.style.border = "1px solid red")
                : (newpassword.current.style.border = "1px solid green");
            }}
          />
          <input
            type="password"
            ref={cpassword}
            autoComplete="newpassword"
            placeholder="Confirm Password"
            required
            minLength={6}
            onChange={() => {
              if (cpassword.current.value !== newpassword.current.value) {
                cpassword.current.style.border = "1px solid red";
              } else {
                cpassword.current.style.border = "1px solid green";
              }
            }}
          />
          <button type="submit" className="profile_button">
            Change Password
          </button>
        </form>
      )}
    </div>
  );
}

export default Profile;
