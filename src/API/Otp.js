export async function GenerateOtp(mailId, URL) {
  let response = { message: "" };
  await fetch(`/user/${URL}?mail=${mailId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
    .then((res) => {
      response = res;
      console.log(response);
    })
    .catch((err) => {
      console.log("Somethin Gone Wrong Please Try Again Later");
    });
  return response;
}
