import { getAllDataController } from "controllers/analyze/getAllData.controller";
import { getTotalCountController } from "controllers/analyze/getTotal.controller";
import { Context, DefaultState } from "koa";
import Router from "koa-router";
import { authHeader } from "middlewares/auth.middleware";

const dataRouter = new Router<DefaultState, Context>();

dataRouter.get("/data", authHeader, async (ctx) => {
  await getAllDataController(ctx);
});

dataRouter.get("/count", authHeader, (ctx) => {
  getTotalCountController(ctx);
});

export { dataRouter };
