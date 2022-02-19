export const saveToCart = async (data) => {
  let response = { status: 500 };
  await fetch("api/Customer/saveToCart", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const CountTotalCartProducts = async (id) => {
  let respones = { status: 500 };
  await fetch(`/api/Customer/countTotalProduct?userId=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((res) => {
      respones = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return respones;
};

export const getCustomerCart = async (userId, offset) => {
  let respones = { status: 500 };
  await fetch(
    `api/Customer/getCustomerCart?userId=${userId}&offset=${offset}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  )
    .then((res) => {
      respones = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return respones;
};

export const deleteCartItem = async (cc_id) => {
  let response = { status: 500 };
  await fetch(`/api/Customer/deleteCartProduct?cartProduct=${cc_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const updateCartDetails = async (data) => {
  let response = { status: 500 };
  await fetch(`/api/Customer/updateCartProduct`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const saveToWishList = async (data) => {
  let response = { status: 500 };
  await fetch("api/Customer/saveToWishList", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const getCustomerWishList = async (userId, offset) => {
  let respones = { status: 500 };
  await fetch(
    `api/Customer/getCustomerWishList?userId=${userId}&offset=${offset}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  )
    .then((res) => {
      respones = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return respones;
};

export const CountTotalWishListProducts = async (id) => {
  let respones = { status: 500 };
  await fetch(`/api/Customer/countTotalWishListProduct?userId=${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((res) => {
      respones = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return respones;
};

export const deleteWishListItem = async (cc_id) => {
  let response = { status: 500 };
  await fetch(`/api/Customer/deleteWishProduct?wishListProduct=${cc_id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};
