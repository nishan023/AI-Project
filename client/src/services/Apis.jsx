import { commonRequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";

export const registerReq = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/api/auth/register`, data);
};

export const loginReq = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/api/auth/login`, data);
};

export const googleUserDataReq = async (token)=>{
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };
  return await commonRequest("GET",`${BACKEND_URL}/api/auth/login-google`,null,headers)
}

export const userDataReq= async(token)=>{
  return await commonRequest("GET",`${BACKEND_URL}/api/user/profile`,null,{
    Authorization: token,
  })
}

export const forgetPasswordReq = async (data) => {
  return await commonRequest(
    "POST",
    `${BACKEND_URL}/api/auth/forget-password`,
    data
  );
};

export const resetPasswordReq = async (data, id) => {
  return await commonRequest(
    "POST",
    `${BACKEND_URL}/api/auth/reset-password/${id}`,
    data
  );
};

export const checkResetLinkReq = async (id, token) => {
  return await commonRequest(
    "GET",
    `${BACKEND_URL}/api/auth/check-reset-link/${id}/${token}`
  );
};
