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
