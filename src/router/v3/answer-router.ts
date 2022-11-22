import { DefaultContext, DefaultState, Next } from "koa";
import Router from "koa-router";
import { surveyControl } from "libraries/survey.lib";

const surveyRouter = new Router<DefaultState, DefaultContext>({
  prefix: "/v3",
});

surveyRouter.post("/answer", async (ctx, next: Next) => {
  await surveyControl(ctx);

  await next();
});

export { surveyRouter };
