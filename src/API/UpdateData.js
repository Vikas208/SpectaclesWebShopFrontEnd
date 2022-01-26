// Change UserName
export const UpdateName = async (data) => {
  let response = { status: 500 };
  await fetch("/api/userAccount/changeUserName", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  })
    .then((res) => {
      // console.log(res);
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};
