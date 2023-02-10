import { Context, DefaultState } from "koa";
import Router from "koa-router";
import { getCategoryScore } from "controllers/analyze/getCategoryData.controller";
import { getRegionScore } from "controllers/analyze/getRegionData.controller";
import { getRecommendation } from "controllers/analyze/getRecommendation.controller";
import { authHeader } from "middlewares/auth.middleware";

const scoreRouter = new Router<DefaultState, Context>({
  prefix: "/score",
});

scoreRouter.get("/region", authHeader, async (ctx) => {
  await getRegionScore(ctx);
});

scoreRouter.get("/category", authHeader, async (ctx) => {
  await getCategoryScore(ctx);
});

scoreRouter.get("/select", authHeader, async (ctx) => {
  await getRecommendation(ctx);
});

export { scoreRouter };
