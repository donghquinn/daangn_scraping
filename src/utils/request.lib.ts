import { DefaultContext } from "koa";
import { Logger } from "./logger.utils";

export function setResponse(
  ctx: DefaultContext,
  status: number,
  data?: unknown
) {
  const body = {
    resCode: status,
    dataRes: data ?? null,
    errMsg: [],
  };

  ctx.body = body;

  Logger.info("%o", ctx.body);
}

export function setErrorResponse(
  ctx: DefaultContext,
  status: number,
  errror: string | string[]
) {
  const messages = [];

  messages.push(errror);

  const body = {
    resCode: status,
    dataRes: {},
    errMsg: messages,
  };

  ctx.body = body;

  Logger.info("%o", ctx.body);
}
