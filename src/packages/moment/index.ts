/**
 * 异步分包
 * 导出要使用的第三方库,在调用处使用异步加载的方式使用
 * 这样不会将异步分包计算到调用处的包体积大小中
 */

import moment from "moment";

export function formatDate(date: Date | string, format: string) {
  return moment(date).format(format);
}
