import { getCategoryScore } from "controllers/analyze/getCategoryData.controller";
import { getRecommendation } from "controllers/analyze/getRecommendation.controller";
import { getRegionScore } from "controllers/analyze/getRegionData.controller";
import { DefaultState } from "koa";
import Router from "koa-router";
import { authHeader } from "middlewares/auth.middleware";
import { DefaultCtx } from "types/request.types";

const scoreRouter = new Router<DefaultState, DefaultCtx>({
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
