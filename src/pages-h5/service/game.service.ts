/**
 * pages-h5分包中 关于游戏相关的接口
 */

import { useConfig } from "@/config";
import type { IAppInfo } from "@/typings/business/game.interface";
import type { IHttpRequestConfig } from "@/typings/common/http";
import { HttpClientFrequently } from "@/utils";

const { __isDev__, USE_MOCK, MOCK_API, API_DOMAIN } = useConfig();

const BASE_URL = __isDev__ && USE_MOCK && !!MOCK_API ? MOCK_API : API_DOMAIN;
const httpInstance = HttpClientFrequently.instance;
httpInstance.setUserConfig({ baseURL: BASE_URL });

const GAME_API = {
  GAME_LIST: `/api/mock/gamelist/{gameId}`,
};

/**
 * 获取游戏列表
 * @param gameId 游戏id
 * @param config 请求配置
 */
export async function fetchGameListMockData(gameId: number, config?: IHttpRequestConfig) {
  return httpInstance.get<{ gameId: number; apps: IAppInfo[] }>(GAME_API.GAME_LIST, {
    urlPath: {
      gameId,
    },
    ...config,
  });
}
