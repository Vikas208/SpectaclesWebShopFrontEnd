//save User
export const SaveUser = async (data) => {
  let response = await fetch("/api/user/register", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

// Login User
export const LoginUser = async (data) => {
  let response = await fetch("/api/user/login", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

// reset Password

export const ResetPassword = async (data) => {
  let response = await fetch("/api/user/resetPassword", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(data),
  });
  return response;
};

//Validate user

export const ValidateUser = async (data) => {
  let response = await fetch("/api/userAccount/validUser", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

export const isUserLogined = async () => {
  let response = await fetch("/api/isUserLogined", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "GET",
  });
  return response;
};

export const Logout = async () => {
  let response = await fetch("/api/user/logout", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "POST",
  });
  return response;
};
