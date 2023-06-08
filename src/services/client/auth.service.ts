import API from "services/client/api";

const APIs = {
  SIGNIN: "/api/v1/auth/login",
  SIGNUP: "/api/v1/auth/register",
  FORGOT_PASSWORD: "/api/v1/auth/forgot-password",
  RESET_PASSWORD: "/api/v1/auth/reset-password",
  VERIFY_TOKEN: "/api/v1/auth/verify",
};

export const signIn = async (values) => {
  return API.post(APIs.SIGNIN, values);
};

export const signup = async (values) => {
  return API.post(APIs.SIGNUP, values);
};

export const forgotPassword = async (values) => {
  return API.post(APIs.FORGOT_PASSWORD, values);
};

export const resetPassword = async (values) => {
  return API.post(APIs.RESET_PASSWORD, values);
};

export const verifyToken = async (token: string): Promise<string> => {
  return API.get(`${APIs.VERIFY_TOKEN}/${token}`);
};
