import { exec } from "child_process";
import fs from "fs";
import path from "path";
import { cwd } from "process";

import { defaultUserConfigPath } from "@hengshuai/mini-type";

const resolvePath = (...args) => path.resolve(cwd(), ...args);

async function bootstrap() {
  const defaultMiniConfigDir = resolvePath(defaultUserConfigPath);
  if (await fs.existsSync(defaultMiniConfigDir)) return;
  return new Promise((resolve, reject) => {
    exec("mini-ci init", err => {
      if (err) {
        return reject(err);
      }
      resolve(1);
    });
  });
}

bootstrap().catch(err => {
  console.error(err);

  process.exit(0);
});
