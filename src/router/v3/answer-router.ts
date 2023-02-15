import { surveyControl } from "controllers/survey/survey.controller";
import { DefaultState, Next } from "koa";
import Router from "koa-router";
import { authHeader } from "middlewares/auth.middleware";
import { DefaultCtx } from "types/request.types";

const surveyRouter = new Router<DefaultState, DefaultCtx>();

surveyRouter.post("/answer", authHeader, async (ctx, next: Next) => {
  await surveyControl(ctx);

  await next();
});

export { surveyRouter };
