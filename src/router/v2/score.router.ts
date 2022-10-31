import { Context } from "koa";
import Router from "koa-router";
import { getAllRegionList } from "libraries/analyze/getRegionData";

const regionScoreRouter = new Router<Record<string, Context>>();

regionScoreRouter.get("/regionScore", async (ctx) => getAllRegionList(ctx));

export { regionScoreRouter };
