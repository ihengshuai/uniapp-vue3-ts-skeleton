// 延时
export function sleep(ms?: number) {
  return new Promise(resolve => setTimeout(resolve, ms || 10));
}
