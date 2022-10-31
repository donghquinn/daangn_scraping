import { Context } from "koa";
import Router from "koa-router";
import { getRegionScore } from "libraries/analyze/getRegionData";

const regionScoreRouter = new Router<Record<string, Context>>();

regionScoreRouter.get("/regionScore", async (ctx) => getRegionScore(ctx));

export { regionScoreRouter };
