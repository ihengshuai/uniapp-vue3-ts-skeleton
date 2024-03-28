import { HttpClient } from "@/utils";

const BASE_URL = "http://localhost:3000";
const httpInstance = HttpClient.createInstance;
httpInstance.setUserConfig({ baseURL: BASE_URL });

const APP_API = {
  HOME: `/api/mock`,
};

export function fetchHomeData() {
  return httpInstance.get(APP_API.HOME, {});
}
