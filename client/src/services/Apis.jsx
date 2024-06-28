import { commonRequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";

export const registerReq = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/api/auth/register`, data);
};

export const loginReq = async (data) => {
  return await commonRequest("POST", `${BACKEND_URL}/api/auth/login`, data);
};
