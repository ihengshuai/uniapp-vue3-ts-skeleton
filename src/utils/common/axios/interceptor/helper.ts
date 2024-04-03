import type { Interceptor, IResponseData } from "@/typings/common/http";

export async function runInterceptors<T = IResponseData>(interceptors: Interceptor[], initData: T) {
  const len = interceptors.length;
  if (len === 0) return initData;
  return interceptors.reduce(
    (p, c) =>
      p
        .then(res => {
          return c.interceptor(res);
        })
        .catch(err => {
          return Promise.reject(err);
        }),
    Promise.resolve(initData)
  );
}
