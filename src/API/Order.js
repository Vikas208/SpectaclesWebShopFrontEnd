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
    method: "PUT",
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
export const getCustomerCancelOrders = async (c_id) => {
  let response = await fetch(
    `/api/Order/getCustomerCancelOrders?userId=${c_id}`,
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

export const validateProductData = async (p_id, qty, onlyframe, glassType) => {
  let response = await fetch(
    encodeURI(
      `/api/Order/validateProductData?p_id=${p_id}&qty=${qty}&onlyframe=${onlyframe}&glassType=${glassType}`
    ),
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
