import React, { useLayoutEffect, useState } from "react";
import { toast } from "react-toastify";
import { cancleOrder, getCustomerOrders } from "../../../API/Order";
import { useDataLayerValue } from "../../../DataLayer";

function YourOrders() {
  const [{ user }] = useDataLayerValue();
  const [order, setOrder] = useState([]);

  const getOrders = async () => {
    let response = await getCustomerOrders(user?.id);
    if (response.status === 200) {
      let result = await response.json();
      setOrder(result);
    } else {
      toast.success("Something is wrong");
    }
  };

  const _cancleOrder = async (order_id) => {
    let ans = window.confirm("Are You Sure?");
    if (ans) {
      let response = await cancleOrder(order_id);
      if (response.status === 200) {
        toast.success("Ordered SuccessFully Cancled");
        getOrders();
      } else {
        toast.error("Something is wrong");
      }
    }
  };
  useLayoutEffect(() => {
    if (user?.id) {
      getOrders();
    }
    return () => {
      setOrder([]);
    };
  }, [user?.id]);
  return (
    <div className="d-flex flex-column container">
      {order.map((element, index) => {
        return (
          <div
            key={index}
            className="d-flex flex-column p-3 m-1"
            style={{
              borderRadius: "10px",
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
            }}
          >
            <section className="header d-flex justify-content-between">
              <span>#Order</span>
              <span>{element?.localDateTime}</span>
            </section>
            <section className="d-flex flex-column">
              <small>
                Address:
                {" " +
                  element?.orderAddress?.address1 +
                  "," +
                  (element?.orderAddress?.address2 == null
                    ? ""
                    : element?.orderAddress?.address2) +
                  "," +
                  element?.orderAddress?.city +
                  "-" +
                  element?.orderAddress?.pincode +
                  ", " +
                  element?.orderAddress?.state}
              </small>
              <small>
                Payble Amount:
                {" " + element?.orderPayment?.total_amount}
              </small>
              <small>
                Payment Type:
                {" " + element?.orderPayment?.payment_type}
              </small>
              <small>
                Payment Status:
                {" " +
                  (Boolean(element?.orderPayment?.payment_status)
                    ? "Done"
                    : "Pending")}
              </small>
              <small>
                Transaction Id:
                {" " +
                  (element?.orderPayment?.transactionid == null
                    ? "-"
                    : element?.orderPayment?.transactionid)}
              </small>
              <small>
                Order Status:
                {" " + element?.order_status}
              </small>
            </section>
            <table className="table mt-3">
              <thead className="table-dark">
                <tr>
                  <th scope="col">
                    <small> Product Name</small>
                  </th>
                  <th scope="col">
                    <small>Price</small>
                  </th>
                  <th scope="col">
                    <small>Qty</small>
                  </th>
                  <th scope="col">
                    <small>Total Price</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {element?.orderedProducts?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <small>{item?.products?.p_name}</small>
                        <small
                          style={{
                            float: "right",
                            verticalAlign: "middle",
                            cursor: "pointer",
                            margin: "2px",
                          }}
                          onClick={() => {
                            let table = document.getElementById(
                              index + "table"
                            );
                            if (table.style.display === "none") {
                              table.style.display = "block";
                            } else {
                              table.style.display = "none";
                            }
                          }}
                        >
                          Read more...
                        </small>

                        <table
                          style={{ fontSize: "small", display: "none" }}
                          className="table table-striped mt-2"
                          id={index + "table"}
                        >
                          <tbody>
                            <tr>
                              <td>OnlyFrame</td>
                              <td>{item?.onlyframe ? "Yes" : "No"}</td>
                            </tr>
                            <tr>
                              <td>Left-Eye-No</td>
                              <td>{item?.left_eye_no}</td>
                            </tr>
                            <tr>
                              <td>Right-Eye-No</td>
                              <td>{item?.right_eye_no}</td>
                            </tr>
                            <tr>
                              <td>Glass Type</td>
                              <td>{item?.glassType}</td>
                            </tr>
                            <tr>
                              <td>Total Price</td>
                              <td>{Number(item?.totalPrice).toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td>Gst</td>
                              <td>{Number(item?.gst).toFixed(2)}</td>
                            </tr>
                            <tr>
                              <td>Other Tax</td>
                              <td>{item?.otherTax}</td>
                            </tr>
                            <tr>
                              <td>Sale</td>
                              <td>{item?.sale}</td>
                            </tr>
                            <tr>
                              <td>Glass Price</td>
                              <td>{item?.glassPrice}</td>
                            </tr>
                            <tr>
                              <td>Product Category</td>
                              <td>
                                {item?.products?.productDescription?.p_category}
                              </td>
                            </tr>
                            <tr>
                              <td>Product Group</td>
                              <td>
                                {item?.products?.productDescription?.p_group}
                              </td>
                            </tr>
                            <tr>
                              <td>Product FrameStyle</td>
                              <td>
                                {
                                  item?.products?.productDescription
                                    ?.p_frameStyle
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>Product FrameSize</td>
                              <td>
                                {
                                  item?.products?.productDescription
                                    ?.p_frameSize
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>Product CompanyName</td>
                              <td>
                                {
                                  item?.products?.productDescription
                                    ?.company_name
                                }
                              </td>
                            </tr>
                            <tr>
                              <td>Product Color</td>
                              <td>
                                {item?.products?.productDescription?.color}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td>
                        <small key={index}>₹{item?.products?.p_price}</small>
                      </td>
                      <td>
                        <small key={index}>{item?.qty}</small>
                      </td>

                      <td>
                        <small key={index}>
                          ₹{Number(item?.totalPrice).toFixed(2)}
                        </small>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {String(element?.order_status).toLowerCase() === "placed" && (
              <button
                className="btn btn-danger"
                onClick={() => {
                  _cancleOrder(element?.order_id);
                }}
              >
                Cancle Order
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default YourOrders;
