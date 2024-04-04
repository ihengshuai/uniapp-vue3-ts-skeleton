// 延时
export function sleep(ms?: number) {
  return new Promise(resolve => setTimeout(resolve, ms || 10));
}

/**
 * 下划线转换驼峰
 */
export function snakeToCamel(data: Record<string, any> | any[] | string): any {
  if (data) {
    if (typeof data === "string") {
      return data.replace(/_([^_])/gi, (_$0, $1) => $1.toUpperCase());
    } else if (typeof data === "number" || typeof data === "boolean") {
      return data;
    } else {
      const res: any = data.constructor === Array ? [] : {};
      for (const key in data) {
        // @ts-ignore
        const value = data[key];
        res[snakeToCamel(key) as string] = typeof value !== "object" || value === null ? value : snakeToCamel(value);
      }
      return res;
    }
  }
  return data;
}
