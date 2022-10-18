import { Next } from "koa";
import Router from "koa-router";
import { DataAnalyze } from "libraries/analyze/split";

const { getAllData, getTotalCount } = DataAnalyze.getInstance();

const dataRouter = new Router<Record<string, never>>();

dataRouter.get("/data", async (ctx, next: Next) => {
  const res = await getAllData();
  ctx.body = {
    totalCounts: res.totalData,
    data: {
      region: res.region,
      category: res.category,
      updated: res.date,
    },
  };

  await next();
});

dataRouter.get("/count", async (ctx, next: Next) => {
  ctx.body = await getTotalCount();

  await next();
});
export { dataRouter };
