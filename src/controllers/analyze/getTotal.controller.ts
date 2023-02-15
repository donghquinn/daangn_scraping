import { Mysql } from "libraries/database/Mysql.lib";
import { selectTotalCount } from "queries/select-data";
import { DefaultCtx } from "types/request.types";
import { TotalCounts } from "types/sql.types";
import { Logger } from "utils/logger.utils";
import { setErrorResponse, setResponse } from "utils/request.lib";

export async function getTotalCountController(ctx: DefaultCtx) {
  try {
    const { count } = await Mysql.query<TotalCounts>(selectTotalCount);

    Logger.info("[DATA_QUERY] Total Count, %o", count);

    setResponse(ctx, 200, count);
  } catch (error) {
    setErrorResponse(ctx, 500, "[Get Total Count Error]");
  }
}
