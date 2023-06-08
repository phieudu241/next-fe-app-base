import API from "services/client/api";

const APIs = {
  ME: "/api/v1/users/me",
};

export const fetchUserInfo = async () => {
  return API.get(APIs.ME);
};
