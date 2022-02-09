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
  frameSize
) => {
  let response = { status: 500 };
  name = String(name).replace("^", "%5E");
  category = String(category).replace("|", "%7").replace("^", "%5E");
  frameStyle = String(frameStyle).replace("|", "%7").replace("^", "%5E");
  companyName = String(companyName).replace("|", "%7").replace("^", "%5E");
  group = String(group).replace("|", "%7").replace("^", "%5E");
  frameSize = String(frameSize).replace("|", "%7").replace("^", "%5E");
  // console.log(category + " " + frameStyle + " " + companyName + " " + group);
  await fetch(
    `/api/products/fetch/countFilterProducts?product=${name}&category=${category}&frameStyle=${frameStyle}&companyName=${companyName}&group=${group}&framesize=${frameSize}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
  offset
) => {
  let response = { status: 500 };
  // console.log(category + " " + frameStyle + " " + companyName + " " + group);
  name = String(name).replace("^", "%5E");
  category = String(category).replace("|", "%7").replace("^", "%5E");
  frameStyle = String(frameStyle).replace("|", "%7").replace("^", "%5E");
  companyName = String(companyName).replace("|", "%7").replace("^", "%5E");
  group = String(group).replace("|", "%7").replace("^", "%5E");
  frameSize = String(frameSize).replace("|", "%7").replace("^", "%5E");

  await fetch(
    `/api/products/fetch/filterproducts?product=${name}&category=${category}&frameStyle=${frameStyle}&companyName=${companyName}&group=${group}&framesize=${frameSize}&offset=${offset}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
