import { Context } from "koa";
import { Mysql } from "libraries/database";
import { setErrorResponse, setResponse } from "libraries/request.lib";
import { selectCombined, selectTotalCount } from "queries/select-data";
import { GetCombined, TotalCounts } from "types/sql.types";
import { Logger } from "utils";

// TODO 카테고리, 지역 이름 데이터 뽑아와서 해당 타입 가드하고
// TODO find() 함수로 item.region = "동작구" 식으로 아이템 뽑아와서 총 개수
export class DataAnalyze {
  private static instance: DataAnalyze;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DataAnalyze();
    }

    return this.instance;
  }

  public async getAllData(ctx: Context) {
    try {
      const [...result] = await Mysql.query<GetCombined[]>(selectCombined);

      Logger.info("[DATA_QUERY] Found Data");

      if (!result) {
        setErrorResponse(ctx, 500, "[No Data Result Found]");
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

  public async getTotalCount(ctx: Context) {
    try {
      const { count } = await Mysql.query<TotalCounts>(selectTotalCount);

      Logger.info("[DATA_QUERY] Total Count, %o", count);

      setResponse(ctx, 200, count);
    } catch (error) {
      setErrorResponse(ctx, 500, "[Get Total Count Error]");
    }
  }

  private splitDate(updated: string) {
    const date = updated.split(" ");

    Logger.info(`date Split`);

    return date;
  }
}
