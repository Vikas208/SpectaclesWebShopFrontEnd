import "./App.css";
import Register from "./Components/Authentication/Registration";
import Login from "./Components/Authentication/Login";
import { Routes, Route } from "react-router-dom";
import Forgot from "./Components/Authentication/Forgot";
import { ToastContainer } from "react-toastify";
import Main from "./Components/Main";
import ErrorPage from "./Components/Pages/Error/ErrorPage";
import { NotFound } from "./API/ImageLink";
import MyAccount from "./Components/Pages/Account/MyAccount";
import Profile from "./Components/Pages/Account/Profile";
import { useDataLayerValue } from "./DataLayer";
import { useEffect } from "react";
import { LoadShopDetails } from "./API/LoadShopDetails";
import { isUserLogined } from "./API/User";
import { actions } from "./Reducer/action";

let regex = /\["|"|]+/g;
function CreateArrray(str) {
  str = String(str).replace(regex, "");
  return String(str).split(",");
}

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  const LoadData = async () => {
    let response = await LoadShopDetails();
    if (response.status === 200) {
      let result = await response.json();
      result.phoneNumber = CreateArrray(result.phoneNumber);
      result.mailId = CreateArrray(result.mailId);
      dispatch({
        type: actions.SET_SHOPDETAILS,
        shopDetails: result,
      });
    }
  };
  const isUserLogin = async () => {
    let respones = await isUserLogined();
    if (respones.status === 200) {
      let result = await respones.json();
      dispatch({
        type: actions.SET_TOKEN,
        token: result.token,
      });
      dispatch({
        type: actions.SET_USER,
        user: {
          mailId: result.mailId,
          name: result.userName,
        },
      });
    }
  };
  useEffect(() => {
    LoadData();
    isUserLogin();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/forgot" element={<Forgot />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<Main />}>
          {token && <Route path="/myAccount" element={<MyAccount />}></Route>}

          {token && (
            <Route path="/myAccount/profile" element={<Profile />}></Route>
          )}
        </Route>
        <Route
          path="*"
          element={
            <ErrorPage imagelink={NotFound.image} text={NotFound.text} />
          }
        ></Route>
      </Routes>
      <ToastContainer
        theme="colored"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
      />
    </div>
  );
}
export default App;
