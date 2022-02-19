export const fetchTotalNumberProducts = async () => {
  let response = { status: 500 };

  await fetch("api/products/fetch/countProducts", {
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
export const fetchTreandingProducts = async () => {
  let respones = { status: 500 };

  await fetch("api/products/fetch/TredingProducts", {
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
  await fetch(
    `/api/products/fetch/fetchProducts?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      method: "GET",
    }
  )
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });

  return response;
};

export const fetchProductReviews = async (productId) => {
  let response = { status: 500 };
  await fetch(`/api/products/fetch/getProductReviews?productId=${productId}`, {
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

export const fetchProductImages = async (productId) => {
  let response = { status: 500 };
  await fetch(`/api/products/fetch/getProductImages?productId=${productId}`, {
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

export const getProduct = async (id) => {
  let response = { status: 500 };
  await fetch(`/api/products/fetch/getProduct?productId=${id}`, {
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

export const saveFeedback = async (data) => {
  let response = { status: 500 };
  await fetch("/api/products/saveFeedback", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
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

export const SearchProduct = async (query, offset) => {
  let response = { status: 500 };
  await fetch(
    `/api/products/fetch/searchProduct?product=${query}&offset=${offset}`,
    {
      headers: {
        Accept: "application/json",
        "content-Type": "application/json",
      },
      method: "GET",
    }
  )
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const CountSearchProduct = async (query) => {
  let response = { status: 500 };
  await fetch(`/api/products/fetch/countTotalSearchProduct?product=${query}`, {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
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

export const CountFilterProducts = async (
  name,
  category,
  frameStyle,
  companyName,
  group,
  frameSize,
  sprice,
  eprice
) => {
  let response = { status: 500 };

  await fetch(
    encodeURI(
      `/api/products/fetch/countFilterProducts?product=${name}&category=${category}&frameStyle=${frameStyle}&companyName=${companyName}&group=${group}&framesize=${frameSize}&startingprice=${sprice}&endingprice=${eprice}`
    ),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "GET",
    }
  )
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const fetchfilterProducts = async (
  name,
  category,
  frameStyle,
  companyName,
  group,
  frameSize,
  sprice,
  eprice,
  offset
) => {
  let response = { status: 500 };

  await fetch(
    encodeURI(
      `/api/products/fetch/filterproducts?product=${name}&category=${category}&frameStyle=${frameStyle}&companyName=${companyName}&group=${group}&framesize=${frameSize}&startingprice=${sprice}&endingprice=${eprice}&offset=${offset}`
    ),
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "GET",
    }
  )
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

export const getData = async () => {
  let response = { status: 500 };
  await fetch(`/api/products/fetch/getData`, {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
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
