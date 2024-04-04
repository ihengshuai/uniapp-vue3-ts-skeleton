import { sleep } from "@/utils/common";
import { Controller, ForbiddenException, Get, Post } from "@nestjs/common";

@Controller("/api/mock")
export class MockController {
  @Get("/correct-request")
  async renderHello() {
    await sleep(1000);
    return "Hi, I'm the data from server..." + new Date().getTime();
  }

  @Post("/business-error-request")
  async renderError() {
    await sleep(1000);

    throw new ForbiddenException({ error: "权限不够,禁止访问" });
  }
}
