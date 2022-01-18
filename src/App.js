import "./App.css";
import Register from "./Components/Authentication/Registration";
import Login from "./Components/Authentication/Login";
import { Routes, Route } from "react-router-dom";
import Forgot from "./Components/Authentication/Forgot";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/forgot" element={<Forgot />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/" element={<Login />}></Route>
      </Routes>
      <ToastContainer theme="colored" autoClose={5000} />
    </div>
  );
}
export default App;
