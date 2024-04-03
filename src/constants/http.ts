export enum HTTP_DATA_TYPE {
  FORM = "form",
  JSON = "json",
  FORMDATA = "form-data",
}

export enum HTTP_CODE {
  NOT_FOUND = 404,
}

/** 并发状态 */
export enum CONCURRENCY_STATUS {
  PENDING = "pending",
  END = "end",
}

/** 异常状态枚举 */
export enum WRONG_MESSAGE {
  /** 请求被取消 */
  ABORT = "request:fail abort",
}

/** HTTP方法 */
export enum HTTP_METHOD {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
  HEAD = "head",
  OPTIONS = "options",
  PATCH = "patch",
  PURGE = "purge",
  LINK = "link",
  UNLINK = "unlink",
}

/** 拦截器类型 */
export enum InterceptorType {
  RESPONSE = "response",
  REQUEST = "request",
  ERROR = "error",
}
