import React, { useEffect, useState } from "react";
import {
  addOrderAddress,
  addOrderProducts,
  addPaymentDetails,
  cancleOrder,
  createNewOrder,
  getAllOrderedCartProducts,
  sendInvoice,
} from "../../../API/Order";
import "../../../Css/OrderForm.css";
import { useDataLayerValue } from "../../../DataLayer";
import { actions } from "../../../Reducer/action";
import { useNavigate } from "react-router-dom";
import { getShowNowOrderProduct } from "../../../API/Product";

import { toast } from "react-toastify";

function OrderForm() {
  const [{ user, isCardOrder, shopNowProduct }, dispatch] = useDataLayerValue();
  const [Pages, setPages] = useState({
    address: true,
    info: false,
  });

  const [Data, setData] = useState({
    address1: "",
    address2: "",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "",
    phonenumber: "",
    id: null,
    order_id: "",
  });
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let data = {};

    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }
    sessionStorage.setItem("orderAddress", JSON.stringify(data));

    dispatch({
      type: actions.SETORDERADDRESS,
      orderAddress: data,
    });

    setPages({ address: false, info: true });
    document.getElementById("homepage").classList.remove("form_active");
    document.getElementById("infopage").classList.add("form_active");
  };

  useEffect(() => {
    if (user?.id != null && isCardOrder == null && shopNowProduct == null) {
      navigate(-1);
    }
    if (user?.id != null) {
      let address = JSON.parse(sessionStorage.getItem("orderAddress"));
      console.log(address);
      if (address != undefined || address != null) {
        for (let [key, value] of Object.entries(address)) {
          setData((pre) => ({
            ...pre,
            [key]: value,
          }));
        }
      }
      console.log(Data);
    }

    return () => {
      setData({
        address1: "",
        address2: "",
        city: "Ahmedabad",
        state: "Gujarat",
        pincode: "",
        phonenumber: "",
        id: null,
        order_id: "",
      });
    };
  }, [user?.id]);

  return (
    <div>
      <div
        className="form_details"
        style={{ userSelect: "none", cursor: "none" }}
      >
        <span className="material-icons-round form_active" id="homepage">
          home
        </span>

        <span className="material-icons-outlined" id="infopage">
          info
        </span>
        <span className="material-icons-outlined" id="paymentpage">
          currency_rupee
        </span>
      </div>
      {Pages.address && (
        <div className="p-3 container">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                defaultValue={user?.name}
                readOnly
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="email"
                required
                readOnly
                defaultValue={user?.mailId}
              />
            </div>
          </div>
          <form onSubmit={handelSubmit}>
            <div className="form-group">
              <label htmlFor="inputAddress">Address</label>
              <input
                type="text"
                className="form-control"
                name="address1"
                id="inputAddress"
                placeholder="1234 Main St"
                required
                defaultValue={Data.address1}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress2">Address 2</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                name="address2"
                placeholder="Apartment, studio, or floor"
                defaultValue={Data.address2}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  name="city"
                  readOnly
                  defaultValue={Data.city}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select
                  id="inputState"
                  className="form-control"
                  name="state"
                  readOnly
                  defaultValue={Data.state}
                >
                  <option>Gujarat</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputZip">PinCode</label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  id="inputZip"
                  pattern="[0-9]{6}"
                  required
                  defaultValue={Data.pincode}
                />
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputNumber">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phonenumber"
                  pattern="[789][0-9]{9}"
                  required
                  defaultValue={Data.phonenumber}
                />
              </div>
            </div>
            <div className="mt-2">
              <button type="submit" className="btn btn-dark">
                Next
              </button>
            </div>
          </form>
        </div>
      )}
      {Pages.info && <ProductInfoPage />}
    </div>
  );
}

export default OrderForm;

function ProductInfoPage() {
  const [{ user, isCardOrder, shopNowProduct, orderDetails }, dispatch] =
    useDataLayerValue();
  const [products, setProducts] = useState([]);
  const [Pages, setPages] = useState({ info: true, payment: false });
  const [netPrice, setNetPrice] = useState(0);
  const navigation = useNavigate();

  // cart products
  const fetchCartOrder = async () => {
    let response = await getAllOrderedCartProducts(user?.id);
    if (response.status === 200) {
      let result = await response.json();
      // console.log(result);
      setProducts(result);
      let totalPrice = 0;
      for (let element of result) {
        totalPrice += element?.totalPrice;
      }
      setNetPrice(totalPrice);
    }
  };

  // shop now product
  const fetchProduct = async () => {
    let { p_id, qty, glassType, left_eye_no, right_eye_no, onlyframe } =
      orderDetails?.orderProducts;
    let response = await getShowNowOrderProduct(
      p_id,
      qty,
      glassType === undefined ? "" : glassType
    );
    if (response.status === 200) {
      let result = await response.json();
      // setProducts(result);
      console.log(result);
      // set Product Information
      result.glassType = glassType;
      result.left_eye_no = left_eye_no;
      result.right_eye_no = right_eye_no;
      result.onlyframe = onlyframe;

      setProducts([result]);
      setNetPrice(result?.totalPrice);
    }
  };
  const handelClick = () => {
    setPages({
      info: false,
      payment: true,
    });
    dispatch({
      type: actions.SETORDERPRODUCTS,
      orderProducts: products,
    });
    document.getElementById("infopage").classList.remove("form_active");
    document.getElementById("paymentpage").classList.add("form_active");
  };

  useEffect(() => {
    if (user?.id != null && isCardOrder != null && Boolean(isCardOrder)) {
      fetchCartOrder();
    } else if (user?.id != null && shopNowProduct != null) {
      fetchProduct();
    }
  }, [user?.id]);

  return (
    <>
      {Pages.info && (
        <div className="container">
          <h3>Your Order</h3>₹
          <div className="products" style={{ maxWidth: "600px" }}>
            <table className="table" style={{ backgroundColor: "e7e5e5a1" }}>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Qty</td>
                  <td>Price</td>
                  <td>Gst</td>
                  <td>Other Tax</td>
                  <td>Sale</td>
                  <td>GlassPrice</td>
                  <td>Total Price</td>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products?.map((element, index) => {
                    return (
                      <tr key={index}>
                        <td
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            navigation(`/product/${element?.p_id}`);
                          }}
                        >
                          {element?.p_name}
                          <br />
                          [GlassType: {element?.glassType} <br /> Left-Eye-No:
                          {element?.left_eye_no} <br /> Right-Eye-No:{" "}
                          {element?.right_eye_no} <br /> OnlyFrame:{" "}
                          {element?.onlyframe ? "Yes" : "No"}]
                        </td>
                        <td>{element?.qty}</td>
                        <td>₹{element?.p_price}</td>
                        <td>₹{element?.gst?.toFixed(2)}</td>
                        <td>₹{element?.otherTax?.toFixed(2)}</td>
                        <td>₹{Number(element?.sale).toFixed(2)}</td>
                        <td>₹{element?.glassPrice}</td>
                        <td>₹{element.totalPrice?.toFixed(2)}</td>
                      </tr>
                    );
                  })}

                <tr>
                  <td colSpan={7}>Net Price</td>
                  <td>₹{netPrice.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            <div className="m-2">
              <button
                type="button"
                className="btn btn-dark w-100"
                onClick={handelClick}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {Pages.payment && <Payment totalPrice={netPrice} />}
    </>
  );
}

function Payment({ totalPrice }) {
  const [{ user, orderDetails }] = useDataLayerValue();
  const [Loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState(null);
  const navigation = useNavigate();
  const [error, setError] = useState(false);
  const handleOrder = async () => {
    if (
      orderDetails?.orderPayment?.payment_type === undefined ||
      orderDetails?.orderPayment?.payment_type === null
    ) {
      toast.info("Please Select Payment Method");
      return 0;
    }

    setLoading(true);
    const data = {
      c_id: user?.id,
    };
    console.log(data);
    // create Order
    let response = await createNewOrder(data);
    if (response.status === 200) {
      let OrderId = await response.json();

      orderDetails.orderAddress.order_id = OrderId;
      console.log(orderDetails.orderAddress);
      let Addressresponse = await addOrderAddress(orderDetails.orderAddress);

      if (Addressresponse.status === 200) {
        orderDetails.orderProducts.forEach((element) => {
          element.order_id = OrderId;
        });

        let response = await addOrderProducts(orderDetails.orderProducts);
        if (response.status === 200) {
          orderDetails.orderPayment.total_amount = totalPrice;
          orderDetails.orderPayment.order_id = OrderId;
          let paymentresponse = await addPaymentDetails(
            orderDetails.orderPayment
          );
          if (paymentresponse.status === 200) {
            console.log(paymentresponse);

            let isEmailSend = await sendInvoice(OrderId);

            if (isEmailSend.status === 200) {
              toast.success("Mail Send");
            } else {
              toast.error(
                "Mail not Send But Order is placed you can check your order"
              );
            }
            setResponseText("Order Placed");
            setLoading(false);
            setTimeout(() => {
              navigation("/");
            }, 4000);
          } else {
            let res = await cancleOrder(OrderId);
            if (res.status === 200) {
              setError(true);
            }
          }
        } else {
          let res = await cancleOrder(OrderId);
          if (res.status === 200) {
            setError(true);
          }
        }
      }
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error("Something is wrong");
      setResponseText("Order Cancled");
      setLoading(false);

      setTimeout(() => {
        navigation("/");
      }, 4000);
    }
  }, [error]);

  return (
    <div className="container" style={{ userSelect: "none" }}>
      <section
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {Loading && (
          <div
            className="spinner-grow"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          ></div>
        )}
        <i style={responseText ? { fontSize: "20px" } : { display: "none" }}>
          {responseText}
        </i>
      </section>

      <fieldset>
        <legend>Payment Method</legend>

        <p style={{ fontSize: "18px" }}>
          <span className="me-1">Total Price</span>
          <span className="me-1">₹{Number(totalPrice).toFixed(2)}</span>
        </p>
        <div className="d-flex align-items-center">
          <Card
            image={
              "https://res.cloudinary.com/dyg4mksoz/image/upload/v1646396810/CommonImages/6828649_xq0fwv.png"
            }
            caption="Cash On Delivery"
            paymentMethod="COD"
          />
          <Card
            image={
              "https://res.cloudinary.com/dyg4mksoz/image/upload/v1646396810/CommonImages/6828649_xq0fwv.png"
            }
            caption="Paytm"
            paymentMethod="Paytm"
          />
        </div>
      </fieldset>
      <button className="btn btn-dark m-3" onClick={handleOrder}>
        Place Order
      </button>
    </div>
  );
}

function Card({ image, caption, paymentMethod }) {
  const [, dispatch] = useDataLayerValue();
  return (
    <section className="d-flex align-items-center justify-content-center m-2">
      <input
        type="radio"
        name="payment"
        style={{ width: "15px", height: "15px" }}
        onClick={() => {
          let data = { payment_type: paymentMethod };
          dispatch({
            type: actions.SETORDERPAYMENT,
            orderPayment: data,
          });
        }}
      />
      <figure className="figure">
        <img
          className="figure-img img-fluid rounded"
          src={image}
          alt="#"
          width={"70px"}
          height={"70px"}
          style={{ objectFit: "contain", marginLeft: "10px" }}
        />
        <figcaption className="figure-caption" style={{ textAlign: "center" }}>
          <small>{caption}</small>
        </figcaption>
      </figure>
    </section>
  );
}
