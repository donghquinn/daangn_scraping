import { Context } from "koa";
import { Mysql } from "libraries/database";
import { selectCombined } from "queries/select-data";
import { GetCombined } from "types/sql.types";
import { Logger } from "utils/logger.utils";
import { setErrorResponse, setResponse } from "utils/request.lib";

export async function getAllDataController(ctx: Context) {
  try {
    const [...result] = await Mysql.query<GetCombined[]>(selectCombined);

    Logger.info("[DATA_QUERY] Found Data");

    if (!result) {
      throw new Error("[GET_ALL_DATA]");
    }

    // this.resultArray.push(...result);

    Logger.info("[DATE_QUERY] FOUND Combined Data");

    const resResult = [];

    for (let i = 0; i <= result.length - 1; i += 1) {
      const category = result[i];

      resResult.push(category);
    }

    setResponse(ctx, 200, resResult);
  } catch (error) {
    setErrorResponse(ctx, 500, "get All Data Error");
  }
}
