// Change UserName
export const UpdateName = async (data) => {
  let response = await fetch("/api/userAccount/changeUserName", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};
