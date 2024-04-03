import { HttpClientFrequently } from "@/utils/common/axios";

const BASE_URL = "http://localhost:10011";
const httpInstance = HttpClientFrequently.createInstance;
httpInstance.setUserConfig({ baseURL: BASE_URL });

const APP_API = {
  HOME: `/api/mock/hello`,
  BUSINESS_ERROR: `/api/mock/get-business-error`,
};

export function fetchUserMockData() {
  return httpInstance.get(APP_API.HOME, {
    data: {
      page: 1,
      pageSize: 10,
    },
    retryCount: 3,
    // captureError: false,
    timeStamp: true,
  });
}

export function fetchBusinessError() {
  return httpInstance.post(APP_API.BUSINESS_ERROR, {
    data: {
      page: 1,
      pageSize: 10,
    },
    retryCount: 3,
    captureError: false,
    timeStamp: true,
  });
}
