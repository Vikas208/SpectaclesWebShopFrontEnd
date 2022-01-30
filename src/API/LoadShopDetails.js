export async function LoadShopDetails() {
  let response = { status: 500 };
  await fetch("/api/load/loadDetails", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}

export async function LoadCarousel() {
  let response = { status: 500 };

  await fetch("/api/load/carousel", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}
