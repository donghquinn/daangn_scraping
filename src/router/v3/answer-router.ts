import { DefaultContext, DefaultState, Next } from "koa";
import Router from "koa-router";
import { surveyControl } from "controllers/servey/survey.controller";

const surveyRouter = new Router<DefaultState, DefaultContext>();

surveyRouter.post("/answer", async (ctx, next: Next) => {
  await surveyControl(ctx);

  await next();
});

export { surveyRouter };
