const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { defaultUserConfigPath } = require("@hengshuai/mini-type");
const { cwd } = require("process");

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
