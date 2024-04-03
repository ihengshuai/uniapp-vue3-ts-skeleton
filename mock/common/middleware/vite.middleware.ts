import { resolve } from "path";
import { NextFunction, Request, Response } from "express";
import { cwd } from "process";
import { ViteDevServer, createServer as createViteServer } from "vite";
import { GlobalConfiguration } from "@/config";
import { readFileSync } from "fs";

const globalConfig = GlobalConfiguration();

let viteIns: ViteDevServer;
export async function ViteMiddleware(req: Request, res: Response, next: NextFunction) {
  if (globalConfig.__is_Prod__) {
    return next();
  }
  if (!viteIns) {
    viteIns = await createViteServer({
      server: {
        middlewareMode: true,
        ...(globalConfig.__isHttps__
          ? {
              https: {
                key: readFileSync(globalConfig.SSL_CERTIFICATE_KEY),
                cert: readFileSync(globalConfig.SSL_CERTIFICATE),
              },
            }
          : {}),
        hmr: {
          host: "localhost",
        },
      },
      appType: "spa",
      configFile: resolve(cwd(), "./vite.config.ts"),
    });
  }

  if (/^\/[^api|vite].+$/.test(req.url) || req.url === "/") {
    return viteIns.middlewares.handle(req, res, next as any) as any;
  }
  next();
}
