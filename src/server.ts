import Koa from "koa";
import json from "koa-json";
import helmet from "koa-helmet";
import cors from "koa-cors";
import { Server } from "http";
import { Logger } from "utils";
import { routerV1 } from "router/v1";
import { authHeader } from "middlewares/auth.middleware";
import { routerV2 } from "router/v2";

export class KoaRouter {
  private port: number;

  private server: Server | null;

  private koa: Koa;

  constructor() {
    this.server = null;

    this.port = Number(process.env.APP_PORT);

    this.koa = new Koa();
  }

  private attachMiddleWare() {
    this.koa.use(json());
    this.koa.use(helmet());
    this.koa.use(cors());
    // this.koa.use(authHeader);
    this.koa.use(routerV1.routes());
    this.koa.use(routerV1.allowedMethods());
    this.koa.use(routerV2.routes());
    this.koa.use(routerV2.allowedMethods());
  }

  start() {
    if (!this.server) {
      this.attachMiddleWare();

      this.server = this.koa.listen(this.port, () => {
        const message = `Server is Listening on ${this.port}`;
        const charRepeat = "@".repeat(message.length);

        Logger.info(charRepeat);
        Logger.info("[SERVER] %o", message);
        Logger.info(charRepeat);
      });
    }
    return;
  }
}
