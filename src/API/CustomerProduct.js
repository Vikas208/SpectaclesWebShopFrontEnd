export const saveToCart = async (data) => {
  let response = await fetch("/api/Customer/saveToCart", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const CountTotalCartProducts = async (id) => {
  let respones = await fetch(`/api/Customer/countTotalProduct?userId=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  return respones;
};

export const getCustomerCart = async (userId, limit, offset) => {
  let respones = await fetch(
    `/api/Customer/getCustomerCart?userId=${userId}&limit=${limit}&offset=${offset}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  return respones;
};

export const deleteCartItem = async (cc_id) => {
  let response = await fetch(
    `/api/Customer/deleteCartProduct?cartProduct=${cc_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  );
  return response;
};

export const updateCartDetails = async (data) => {
  let response = await fetch(`/api/Customer/updateCartProduct`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

export const saveToWishList = async (data) => {
  let response = await fetch("/api/Customer/saveToWishList", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
};

export const getCustomerWishList = async (userId, offset) => {
  let respones = await fetch(
    `/api/Customer/getCustomerWishList?userId=${userId}&offset=${offset}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  return respones;
};

export const CountTotalWishListProducts = async (id) => {
  let respones = await fetch(
    `/api/Customer/countTotalWishListProduct?userId=${id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );
  return respones;
};

export const deleteWishListItem = async (cc_id) => {
  let response = await fetch(
    `/api/Customer/deleteWishProduct?wishListProduct=${cc_id}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }
  );
  return response;
};

export const getBillingPricing = async (c_id) => {
  let respones = await fetch(`/api/Customer/getBillingPricing?userId=${c_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  return respones;
};

export const validateCartProductData = async (c_id) => {
  let response = await fetch(
    encodeURI(`/api/Customer/validateProductData?userId=${c_id}`),
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
