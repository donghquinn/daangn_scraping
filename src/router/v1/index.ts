import { DefaultState } from "koa";
import Router from "koa-router";
import { DefaultCtx } from "types/request.types";
import { dataRouter } from "./data.router";

const routerV1 = new Router<DefaultState, DefaultCtx>({
  prefix: "/v1",
});

routerV1.use(dataRouter.routes());

export { routerV1 };
