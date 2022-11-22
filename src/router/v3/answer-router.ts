import { DefaultContext, DefaultState, Next } from "koa";
import Router from "koa-router";

const surveyRouter = new Router<DefaultState, DefaultContext>({
  prefix: "/v3",
});

surveyRouter.post("/answer", async (ctx, next: Next) => {});
