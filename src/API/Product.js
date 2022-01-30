export const fetchTreandingProducts = async () => {
  let respones = { status: 500 };

  await fetch("api/products/TredingProducts", {
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
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

export const fetchAllProducts = async (limit, offset) => {
  let response = { status: 500 };
  await fetch(`/api/products/fetchProducts?limit=${limit}&offset=${offset}`, {
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
    method: "GET",
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};
