import { Context } from "koa";
import Router from "koa-router";
import { dataRouter } from "./data.router";

const routerV1 = new Router<Record<string, Context>>({
  prefix: "/api",
});

routerV1.use(dataRouter.routes());

export { routerV1 };
