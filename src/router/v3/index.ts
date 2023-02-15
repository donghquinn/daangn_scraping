import { DefaultState } from "koa";
import Router from "koa-router";
import { DefaultCtx } from "types/request.types";
import { surveyRouter } from "./answer-router";

const routerV3 = new Router<DefaultState, DefaultCtx>({ prefix: "/v3" });

routerV3.use(surveyRouter.routes());

export { routerV3 };
