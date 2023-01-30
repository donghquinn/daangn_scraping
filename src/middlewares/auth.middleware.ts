import { Context, Next } from "koa";
import { Logger } from "utils/logger.utils";

export function authHeader(ctx: Context, next: Next) {
  const { date } = ctx.header;

  Logger.info("Date: %o", date);

  return next();
}
