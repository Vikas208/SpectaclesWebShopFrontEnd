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
import { useLayoutEffect } from "react";
import { LoadShopDetails, LoadPricingDetails } from "./API/LoadShopDetails";
import { isUserLogined } from "./API/User";
import { CountTotalCartProducts } from "./API/CustomerProduct";
import { getData } from "./API/Product";
import { actions } from "./Reducer/action";
import Home from "./Components/Pages/Home/Home";
import Product from "./Components/Pages/ProductPage/Product";
import Search from "./Components/Pages/Search/Search";
import Cart from "./Components/Pages/Cart/Cart";
import WishList from "./Components/Pages/Wishlist/WishList";

function App() {
  const [{ token, user }, dispatch] = useDataLayerValue();

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
  const countTotalCartProduct = async () => {
    let response = await CountTotalCartProducts(user?.id);
    if (response.status === 200) {
      let length = await response.json();
      dispatch({
        type: actions.SETCART,
        NumberOfCartProducts: length,
      });
    }
  };
  const LoadPricingData = async () => {
    let response = await LoadPricingDetails();
    if (response.status === 200) {
      let result = await response.json();
      dispatch({
        type: actions.GLASSPRICING,
        glassPricing: result.GlassPricing,
      });
      dispatch({
        type: actions.TAXDETAILS,
        taxDetails: result.taxDetails,
      });
    }
  };
  useLayoutEffect(() => {
    fetchProductCategories();
    LoadData();
    LoadPricingData();
    isUserLogin();
  }, []);

  useLayoutEffect(() => {
    if (user?.id != null) {
      countTotalCartProduct();
    }
  }, [user]);

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
          {token && <Route exact path="/cart" element={<Cart />}></Route>}
          {token && (
            <Route exact path="/wishlist" element={<WishList />}></Route>
          )}
          <Route path="/product/:id" element={<Product />}></Route>
          <Route path="/search/:product" element={<Search />}></Route>
          <Route
            path="/filterproducts/:product/:category/:frameStyle/:companyName/:group/:framesize/:startingprice/:endingprice"
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
