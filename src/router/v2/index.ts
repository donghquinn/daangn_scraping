import { DefaultState } from "koa";
import Router from "koa-router";
import { DefaultCtx } from "types/request.types";
import { scoreRouter } from "./score.router";

const routerV2 = new Router<DefaultState, DefaultCtx>({ prefix: "/v2" });

routerV2.use(scoreRouter.routes());

export { routerV2 };
