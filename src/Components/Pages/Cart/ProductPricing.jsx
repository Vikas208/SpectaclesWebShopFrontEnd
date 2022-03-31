import React, { useState } from "react";
import { useEffect } from "react";
import {
  getBillingPricing,
  validateCartProductData,
} from "../../../API/CustomerProduct";
import { LoadGlassCharges } from "../../../API/LoadShopDetails";
import { useDataLayerValue } from "../../../DataLayer";
import { actions } from "../../../Reducer/action";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function ProductPricing() {
  const [isHidden, setIsHidden] = useState(false);
  const [{ user, reloadCartPricing, getCartOrderedProducts }, dispatch] =
    useDataLayerValue();
  const [pricing, setPricing] = useState({});
  const [glassCharges, setGlassCharges] = useState([{}]);
  const navigation = useNavigate();

  const fetchPricing = async () => {
    let billingresponse = await getBillingPricing(user?.id);
    let glassCharges = await LoadGlassCharges();
    if (billingresponse.status === 200) {
      let result = await billingresponse.json();
      setPricing(result);
    }
    if (glassCharges.status === 200) {
      let result = await glassCharges.json();
      setGlassCharges(result);
    }
  };

  const checkCartProductData = async () => {
    let response = await validateCartProductData(user?.id);
    if (response.status === 200) {
      let result = await response.json();
      if (!result.success) {
        toast.info(result.message);
      } else {
        dispatch({
          type: actions.ISCARTORDER,
          isCardOrder: true,
        });
        navigation("/order");
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: actions.ISCARTORDER,
      isCardOrder: null,
    });
  }, []);
  useEffect(() => {
    if (user?.id != null) {
      fetchPricing();
    }
    return () => {
      dispatch({
        type: actions.RELOADCARTPRICING,
        reloadCartPricing: false,
      });
    };
  }, [user?.id, reloadCartPricing]);
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <td colSpan={2} style={{ fontSize: "24px" }}>
              Billing Information
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="d-flex align-item-center">
              Price
              <small
                onMouseEnter={() => {
                  setIsHidden(true);
                }}
                onMouseLeave={() => setIsHidden(false)}
              >
                <span
                  className="material-icons-outlined"
                  style={{ cursor: "pointer" }}
                >
                  info
                </span>
                <br />
                {isHidden && (
                  <small
                    style={{
                      position: "absolute",
                      zIndex: "2",
                      backgroundColor: "white",
                      userSelect: "none",
                    }}
                  >
                    This Amount is Net Amount after Deduct Sale Amount and
                    Include Tax Also
                  </small>
                )}
              </small>
            </td>

            <td>₹{pricing[0]?.totalprice?.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Gst</td>
            <td>₹{Number(pricing[0]?.gst)?.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Other Tax</td>
            <td>₹{pricing[0]?.othertax}</td>
          </tr>
          <tr>
            <td>Total Glass Price</td>
            <td>₹{pricing[0]?.glassPrice}</td>
          </tr>
          {glassCharges &&
            glassCharges?.map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element?.glass_name}</td>
                  <td>₹{element?.price}</td>
                </tr>
              );
            })}
          <tr style={{ backgroundColor: "black", color: "white" }}>
            <td>Net Amount</td>
            <td>₹{pricing[0]?.totalprice?.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={2} className="container text-center">
              <button
                className="cart_product_button d-flex align-item-center justify-content-between pt-3 pb-3 ps-2 w-75"
                style={{ backgroundColor: "black" }}
                onClick={checkCartProductData}
              >
                Process to CheckOut
                <span className="material-icons-outlined ms-2 me-2">
                  shopping_cart_checkout
                </span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ProductPricing;
