import { HttpClient } from "@/utils";

const BASE_URL = "https://mock.apifox.com/m1/3906754-0-default";
const httpInstance = HttpClient.createInstance;
httpInstance.setUserConfig({ baseURL: BASE_URL });

const APP_API = {
  HOME: `/api/mock/list`,
};

export function fetchUserMockData() {
  return httpInstance.get(APP_API.HOME, {});
}
