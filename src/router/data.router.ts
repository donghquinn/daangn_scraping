import { Next } from "koa";
import Router from "koa-router";
import { DataAnalyze } from "libraries/analyze/split";

const { getAllData } = DataAnalyze.getInstance();

const dataRouter = new Router();

dataRouter.get("/data", async (ctx, next: Next) => {
  ctx.body = await getAllData();

  await next();
});

export { dataRouter };
