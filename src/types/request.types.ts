import { Context } from "koa";

export interface DefaultCtx extends Context {
  clientid: string;
}
