export async function GenerateOtp(mailId, URL) {
  let response = await fetch(`/api/user/${URL}?mail=${mailId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  });
  return response;
}

export async function ValidateOtp(mailid, otp) {
  let response = await fetch(
    `/api/user/validateOtp?mail=${mailid}&otp=${otp}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    }
  );
  return response;
}
