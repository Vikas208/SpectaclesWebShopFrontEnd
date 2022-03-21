export const getOldAddress = async (c_id) => {
  let response = await fetch(`/api/Order/getOldAddress?userId=${c_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const getAllOrderedCartProducts = async (c_id) => {
  let response = await fetch(
    `/api/Order/getCustomerCartOrderedProduct?userId=${c_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  return response;
};

export const createNewOrder = async (data) => {
  let response = await fetch("/api/Order/createNewOrder", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const addOrderAddress = async (data) => {
  let response = await fetch("/api/Order/addOrderAddress", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const addOrderProducts = async (data) => {
  let response = await fetch("/api/Order/addOrderedProducts", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const addPaymentDetails = async (data) => {
  let response = await fetch("/api/Order/addProductPayment", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const cancleOrder = async (orderId) => {
  let respones = await fetch(`/api/Order/cancelOrder?order_id=${orderId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });
  return respones;
};

export const sendInvoice = async (orderId) => {
  let response = await fetch(`/api/Order/sendInvoice?order=${orderId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  return response;
};

export const getCustomerOrders = async (c_id) => {
  let response = await fetch(`/api/Order/getCustomerOrders?userId=${c_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};
