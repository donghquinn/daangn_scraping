import { Context, DefaultState } from "koa";
import Router from "koa-router";
import { getCategoryScore } from "libraries/analyze/getCategoryData";
import { getRegionScore } from "libraries/analyze/getRegionData";
import { selectCategoryWithRegion } from "libraries/analyze/selectRegion-category";

const scoreRouter = new Router<DefaultState, Context>({
  prefix: "/score",
});

scoreRouter.get("/region", (ctx) => getRegionScore(ctx));
scoreRouter.get("/category", (ctx) => getCategoryScore(ctx));
scoreRouter.get("/select", (ctx) => selectCategoryWithRegion(ctx));

export { scoreRouter };
