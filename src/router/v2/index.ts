import { Context } from "koa";
import Router from "koa-router";
import { regionScoreRouter } from "./score.router";

const routerV2 = new Router<Record<string, Context>>();

routerV2.use(regionScoreRouter.routes());

export { routerV2 };
