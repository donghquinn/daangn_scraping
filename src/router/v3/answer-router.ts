import { DefaultContext, DefaultState, Next } from "koa";
import Router from "koa-router";
import { surveyControl } from "controllers/servey/survey.controller";
import { authHeader } from "middlewares/auth.middleware";

const surveyRouter = new Router<DefaultState, DefaultContext>();

surveyRouter.post("/answer", authHeader, async (ctx, next: Next) => {
  await surveyControl(ctx);

  await next();
});

export { surveyRouter };
