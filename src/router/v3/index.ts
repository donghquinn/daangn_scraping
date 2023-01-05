import { DefaultContext, DefaultState } from "koa";
import Router from "koa-router";
import { surveyRouter } from "./answer-router";

const routerV3 = new Router<DefaultState, DefaultContext>({ prefix: "/v3" });

routerV3.use(surveyRouter.routes());

export { routerV3 };
