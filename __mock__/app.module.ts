import { Module } from "@nestjs/common";

import { CommonModule } from "@/modules/common/common.module";
import { MockModule } from "@/modules/mock/mock.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [CommonModule, MockModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
