import { Context, DefaultState } from "koa";
import Router from "koa-router";
import { scoreRouter } from "./score.router";

const routerV2 = new Router<DefaultState, Context>({ prefix: "/v2" });

routerV2.use(scoreRouter.routes());

export { routerV2 };
