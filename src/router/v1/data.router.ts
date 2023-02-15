import { getAllDataController } from "controllers/analyze/getAllData.controller";
import { getTotalCountController } from "controllers/analyze/getTotal.controller";
import { DefaultState } from "koa";
import Router from "koa-router";
import { authHeader } from "middlewares/auth.middleware";
import { DefaultCtx } from "types/request.types";

const dataRouter = new Router<DefaultState, DefaultCtx>();

dataRouter.get("/data", authHeader, async (ctx) => {
  await getAllDataController(ctx);
});

dataRouter.get("/count", authHeader, async (ctx) => {
  await getTotalCountController(ctx);
});

export { dataRouter };
