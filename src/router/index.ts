import Router from "koa-router";
import { dataRouter } from "./data.router";

const routerV1 = new Router({ prefix: "/api" });

routerV1.use(dataRouter.routes());

export { routerV1 };
