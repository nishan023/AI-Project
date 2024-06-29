import { commonRequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";

export const registerReq = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/api/auth/register`, data);
};

export const loginReq = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/api/auth/login`, data);
};

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
