import { Context } from "koa";
import Router from "koa-router";
import { DataAnalyze } from "libraries/analyze/split";

const { getAllData, getTotalCount } = DataAnalyze.getInstance();

const dataRouter = new Router<Record<string, Context>>();

dataRouter.get("/data", (ctx) => getAllData(ctx));

dataRouter.get("/count", (ctx) => getTotalCount(ctx));

export { dataRouter };
