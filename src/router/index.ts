import Router from "koa-router";
import { GetCombined } from "types/sql.types";
import { dataRouter } from "./data.router";

const routerV1 = new Router<Record<string, Array<GetCombined[]>>>({
  prefix: "/api",
});

routerV1.use(dataRouter.routes());

export { routerV1 };
