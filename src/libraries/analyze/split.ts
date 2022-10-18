import { Mysql } from "libraries/database";
import { selectCombined, selectTotalCount } from "queries/select-data";
import { GetCombined, TotalCounts } from "types/sql.types";
import { Logger } from "utils";

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
      const totalData = await this.getTotalCount();

      const result = await Mysql.query<GetCombined>(selectCombined);

      Logger.info("[DATA_QUERY] Found Data");

      const date = this.splitDate(result.updated);

      return {
        totalData,
        region: result.region,
        category: result.category,
        date,
      };
    } catch (error) {
      throw new Error("[DATA_QUERY] Error!");
    }
  }

  public async getTotalCount() {
    try {
      const counts = await Mysql.query<TotalCounts>(selectTotalCount);

      Logger.info(`[DATA_QUERY] Total Count: ${counts.count}`);

      return counts;
    } catch (error) {
      throw new Error("[DATA_QUERY] Error!");
    }
  }

  private splitDate(updated: string) {
    const date = updated.split(" ");

    Logger.info(`date Split`);

    return date;
  }
}
