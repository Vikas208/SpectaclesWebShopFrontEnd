export async function GenerateOtp(mailId, URL) {
  let response = { status: 500 };
  await fetch(`/api/user/${URL}?mail=${mailId}`, {
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
      console.log(err);
    });
  return response;
}
