import { sleep } from "@/utils/common";
import { Controller, ForbiddenException, Get, Post } from "@nestjs/common";

@Controller("/api/mock")
export class MockController {
  @Get("/hello")
  async renderHello() {
    await sleep(1000);
    return "hello world";
  }

  @Post("/get-business-error")
  async renderError() {
    await sleep(1000);

    throw new ForbiddenException({ error: "权限不够,禁止访问" });
  }
}
