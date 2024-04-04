import { sleep } from "@/utils/common";
import { Controller, ForbiddenException, Get, Param, Post } from "@nestjs/common";

@Controller("/api/mock")
export class MockController {
  @Get("/correct-request/:id")
  async renderHello(@Param("id") id: string) {
    await sleep(1000);
    return "Hi, I'm the data from server..." + id;
  }

  @Post("/business-error-request")
  async renderError() {
    await sleep(1000);

    throw new ForbiddenException({ error: "没有权限访问" });
  }

  @Get("/global-data")
  async renderGlobalData() {
    await sleep(1000);

    return {
      name: "ihengshuai",
      age: 18,
      sex: "男",
    };
  }
}
