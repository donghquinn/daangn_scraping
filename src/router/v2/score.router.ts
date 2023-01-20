import { Context, DefaultState } from "koa";
import Router from "koa-router";
import { getCategoryScore } from "controllers/analyze/getCategoryData.controller";
import { getRegionScore } from "controllers/analyze/getRegionData.controller";
import { getRecommendation } from "controllers/analyze/getRecommendation.controller";

const scoreRouter = new Router<DefaultState, Context>({
  prefix: "/score",
});

scoreRouter.get("/region", (ctx) => getRegionScore(ctx));
scoreRouter.get("/category", (ctx) => getCategoryScore(ctx));
scoreRouter.get("/select", (ctx) => getRecommendation(ctx));

export { scoreRouter };
