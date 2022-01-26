//save User
export const SaveUser = async (data) => {
  let response = { status: 500 };
  await fetch("/api/user/register", {
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
  let response = { status: 500 };
  await fetch("/api/user/login", {
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
  let response = { status: 500 };
  await fetch("/api/user/resetPassword", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "PUT",
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

//Validate user

export const ValidateUser = async (data) => {
  let response = { status: 500 };

  await fetch("/api/userAccount/validUser", {
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

export const isUserLogined = async () => {
  let response = { status: 500 };
  await fetch("/api/isUserLogined", {
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

export const Logout = async () => {
  let response = { status: 500 };
  await fetch("/api/user/logout", {
    headers: {
      Accept: "application/json",
      "content-Type": "application/json",
    },
    method: "POST",
  })
    .then((res) => {
      response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};
