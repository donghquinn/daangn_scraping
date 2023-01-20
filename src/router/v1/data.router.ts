import { getAllDataController } from "controllers/analyze/getAllData.controller";
import { getTotalCountController } from "controllers/analyze/getTotal.controller";
import { Context, DefaultState } from "koa";
import Router from "koa-router";

const dataRouter = new Router<DefaultState, Context>();

dataRouter.get("/data", async (ctx) => {
  await getAllDataController(ctx);
});

dataRouter.get("/count", (ctx) => {
  getTotalCountController(ctx);
});

export { dataRouter };
