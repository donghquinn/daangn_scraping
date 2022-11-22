import { DefaultContext, DefaultState } from "koa";
import Router from "koa-router";

const routerV3 = new Router<DefaultState, DefaultContext>({ prefix: "/v3" });
