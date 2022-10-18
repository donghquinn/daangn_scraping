import { MysqlError } from "error/mysql.error";
import { Mysql } from "libraries/database";
import { selectCombined, selectTotalCount } from "queries/select-data";
import { GetCombined, TotalCounts } from "types/sql.types";
import { Logger } from "utils";

// TODO 카테고리, 지역 이름 데이터 뽑아와서 해당 타입 가드하고
// TODO find() 함수로 item.region = "동작구" 식으로 아이템 뽑아와서 총 개수
export class DataAnalyze {
  private static instance: DataAnalyze;

  // private resultArray: Array<GetCombined>;

  // constructor() {
  //   this.resultArray = [];
  // }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new DataAnalyze();
    }

    return this.instance;
  }

  public async getAllData() {
    try {
      const [...result] = await Mysql.query<GetCombined[]>(selectCombined);

      Logger.info("[DATA_QUERY] Found Data");

      if (!result) {
        throw new MysqlError(
          "[DATA_QUERY]",
          "COMBINED DATA NOT FOUND",
          "No result"
        );
      }

      // this.resultArray.push(...result);

      Logger.info("[DATE_QUERY] FOUND Combined Data");

      const resResult = [];

      for (let i = 0; i <= result.length - 1; i += 1) {
        const category = result[i];

        resResult.push(category);
      }

      // const resResult = {
      //   category: result
      //     .map((item) => {
      //       item.category;
      //     })
      //     .toString(),
      //   region: result.map((item) => item.region).toString(),
      // };

      Logger.info("[DATA_QUERY] data %o", resResult);

      return resResult;
    } catch (error) {
      if (error instanceof MysqlError) {
        throw new MysqlError("[DATA_QUERY]", "MYSQL ERROR", "Query error");
      }

      if (error instanceof Error) {
        throw new MysqlError("[DATA_QUERY]", "NOT MYSQL ERROR", "Query error");
      }

      throw new MysqlError(
        "[DATA_QUERY]",
        "NOT MYSQL Error",
        JSON.stringify(error)
      );
    }
  }

  public async getTotalCount() {
    try {
      const counts = await Mysql.query<TotalCounts>(selectTotalCount);

      Logger.info("[DATA_QUERY] Total Count, %o", counts.count);

      return counts;
    } catch (error) {
      if (error instanceof MysqlError) {
        throw new MysqlError("[DATA_QUERY]", "MYSQL ERROR", "Query error");
      }

      if (error instanceof Error) {
        throw new MysqlError("[DATA_QUERY]", "NOT MYSQL ERROR", "Query error");
      }

      throw new MysqlError(
        "[DATA_QUERY]",
        "NOT MYSQL Error",
        JSON.stringify(error)
      );
    }
  }

  private splitDate(updated: string) {
    const date = updated.split(" ");

    Logger.info(`date Split`);

    return date;
  }
}
