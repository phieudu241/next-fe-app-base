import API from "services/client/api";

const APIs = {
  ERROR_REPORT: "/api/error/report",
};

export const reportError = async (error: Partial<Error>) => {
  return API.post(APIs.ERROR_REPORT, {
    error
  });
};
