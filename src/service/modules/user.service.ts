import { HttpClientFrequently } from "@/utils/common/axios";

const BASE_URL = "https://xxx";
const httpInstance = HttpClientFrequently.createInstance;
httpInstance.setUserConfig({ baseURL: BASE_URL });

const APP_API = {
  HOME: `/api/mock/list`,
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
