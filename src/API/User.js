//save User
export const SaveUser = async (data) => {
  let response = { message: "" };
  await fetch("/user/register", {
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

// Login User
export const LoginUser = async (data) => {
  let response = { message: " " };
  await fetch("/user/login", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((res) => {
      response = res;
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

// reset Password

export const ResetPassword = async (data) => {
  let response = { message: "" };
  await fetch("/user/resetPassword", {
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
