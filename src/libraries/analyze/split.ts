import { MysqlError } from "error/mysql.error";
import { Mysql } from "libraries/database";
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

  public async getAllData() {
    try {
      console.log("hi 0");

      const totalCount = await this.getTotalCount();

      console.log("hi 1");

      const result = await Mysql.query<GetCombined[]>(selectCombined);

      console.log("hi 2");

      Logger.info("[DATA_QUERY] Found Data");

      if (!result || result.length === 0) {
        throw new MysqlError(
          "[DATA_QUERY]",
          "COMBINED DATA NOT FOUND",
          "No result"
        );
      }

      const resResult = {
        count: totalCount.count,
        data: result.map((item) => {
          return {
            region: item.region,
            category: item.category,
            date: item.updated.split("")[1],
          };
        }),
      };

      console.log("hi 3");

      Logger.info("[DATE_QUERY] FOUND Combined Data");

      // if (!region || !category || !updated) {
      //   throw new MysqlError(
      //     "[DATA_QUERY]",
      //     "No Combined Data Found",
      //     "Ignore"
      //   );
      // }

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

      Logger.info(`[DATA_QUERY] Total Count: ${counts.count}`);

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
