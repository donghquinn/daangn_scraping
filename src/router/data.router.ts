import { Next } from "koa";
import Router from "koa-router";
import { DataAnalyze } from "libraries/analyze/split";

const { getAllData, getTotalCount } = DataAnalyze.getInstance();

const dataRouter = new Router();

dataRouter.get("/data", async (ctx, next: Next) => {
  ctx.body = await getAllData();

  await next();
});

dataRouter.get("/count", async (ctx, next: Next) => {
  ctx.body = await getTotalCount();

  await next();
});
export { dataRouter };
