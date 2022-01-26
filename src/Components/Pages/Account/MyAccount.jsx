import React from "react";
import Card from "../../MainComponents/Card";
import "../../../Css/account.css";

const YourOrderImageLink = "1Xm12Mjb8N5B9wbr4cR7-gyRAf1ytgIoc";
const ProfileImageLink = "1LI6bdU-5Zsr4uD_ASQ1ZoBLD9ArAGQ5k";
function MyAccount() {
  return (
    <div className="myAccount">
      {/* Your Orders */}
      {/* Profile */}
      <Card image={YourOrderImageLink} text={"Your Orders"} />
      <Card image={ProfileImageLink} text={"Profile"} onclicktext="profile" />
    </div>
  );
}
export default MyAccount;
