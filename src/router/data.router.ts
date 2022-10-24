import { DefaultContext, Next } from "koa";
import Router from "koa-router";
import { DataAnalyze } from "libraries/analyze/split";
import { GetCombined } from "types/sql.types";

const { getAllData, getTotalCount } = DataAnalyze.getInstance();

const dataRouter = new Router<Record<string, DefaultContext>>();

dataRouter.get("/data", (ctx) => getAllData(ctx));

dataRouter.get("/count", (ctx) => getTotalCount(ctx));

export { dataRouter };
