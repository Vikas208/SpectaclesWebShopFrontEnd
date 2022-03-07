export async function LoadShopDetails() {
  let response = await fetch("/api/load/loadDetails", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
  return response;
}

export async function LoadCarousel() {
  let response = await fetch("/api/load/carousel", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
  return response;
}

export async function LoadShippingCharges() {
  let response = await fetch("/api/shippingCharges", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
  return response;
}
export async function LoadGlassCharges() {
  let response = await fetch("/api/glassCharges", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
  return response;
}
