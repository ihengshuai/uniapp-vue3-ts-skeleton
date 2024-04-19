import { GlobalConfiguration } from "@/config";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { createReadStream } from "fs";
import { resolve } from "path";
import { cwd } from "process";

@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const globalConfig = GlobalConfiguration();
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const code = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorException = exception instanceof HttpException ? exception?.getResponse?.() : exception;

    // 定义错误格式
    const error = {
      code,
      message: typeof errorException === "string" ? errorException : (errorException as any)?.message || errorException,
      error: (errorException as any)?.error,
      timestamp: new Date().toISOString(),
    };

    // 访问的是页面时渲染错误页面
    const isAccessPage = !/^\/(api|.*-api).*/i.test(request.originalUrl);
    if (isAccessPage) {
      // return response.render("exception/index", {
      //   code,
      //   message: error.message || error.error,
      // });
      const isDev = globalConfig.__is_Dev__;
      const CLIENT_DIR = globalConfig.CLIENT_DIR;
      const clientPage = createReadStream(resolve(cwd(), isDev ? "./index.html" : `${CLIENT_DIR}/index.html`));
      return clientPage.pipe(response);
    }

    console.error(`【HTTP_FILTER】`, exception.getResponse() || exception, "\n");

    try {
      response.status(200).json({ ...error });
    } catch (error) {
      response.end();
    }
  }
}
