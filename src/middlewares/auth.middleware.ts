import { Context, Next } from "koa";
import { Logger } from "utils";

export function authHeader(ctx: Context, next: Next) {
  const date = ctx.header.date;

  Logger.info("%o", date);

  return next();
}
