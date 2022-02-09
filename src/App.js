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
import { getData } from "./API/Product";
import { actions } from "./Reducer/action";
import Home from "./Components/Pages/Home/Home";
import Product from "./Components/Pages/ProductPage/Product";
import Search from "./Components/Pages/Search/Search";

function App() {
  const [{ token }, dispatch] = useDataLayerValue();

  const LoadData = async () => {
    let response = await LoadShopDetails();
    if (response.status === 200) {
      let result = await response.json();
      result.phoneNumber = JSON.parse(result?.phoneNumber);
      result.mailId = JSON.parse(result?.mailId);
      dispatch({
        type: actions.SET_SHOPDETAILS,
        shopDetails: result,
      });
      document.title = result?.shopName;
    }
  };
  const isUserLogin = async () => {
    let respones = await isUserLogined();
    if (respones.status === 200) {
      let result = await respones.json();
      console.log(result);
      dispatch({
        type: actions.SET_TOKEN,
        token: result.token,
      });
      dispatch({
        type: actions.SET_USER,
        user: {
          id: result.userDetails.id,
          mailId: result.userDetails.mailId,
          name: result.userDetails.name,
        },
      });
    }
  };
  const fetchProductCategories = async () => {
    let response = await getData();
    if (response.status === 200) {
      let result = await response.json();
      dispatch({
        type: actions.DATA,
        payload: {
          categories: result.categories,
          frameStyles: result.frameStyles,
          companyNames: result.companyNames,
        },
      });
    }
  };
  useEffect(() => {
    fetchProductCategories();
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
          <Route path="/" element={<Home />}></Route>
          {token && <Route path="/myAccount" element={<MyAccount />}></Route>}

          {token && (
            <Route path="/myAccount/profile" element={<Profile />}></Route>
          )}
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/search/:product" element={<Search />}></Route>
          <Route
            path="/filterproducts/:product/:category/:frameStyle/:companyName/:group/:framesize"
            element={<Search isFilter={true} />}
          ></Route>
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
