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

  async getAllData() {
    try {
      const totalData = await this.getTotalCount();

      const { region, category, updated } = await Mysql.query<GetCombined>(
        selectCombined
      );

      Logger.info("[DATA_QUERY] Found Data");

      const date = this.splitDate(updated);

      return {
        totalCounts: totalData,
        data: {
          region,
          category,
          date,
        },
      };
    } catch (error) {
      throw new Error("[DATA_QUERY] Error!");
    }
  }

  private async getTotalCount() {
    try {
      const { count } = await Mysql.query<TotalCounts>(selectTotalCount);

      Logger.info(`[DATA_QUERY] Total Count: ${count}`);

      return count;
    } catch (error) {
      throw new Error("[DATA_QUERY] Error!");
    }
  }

  splitDate(updated: string) {
    const date = updated.split(" ");

    Logger.info(`date Split`);

    return date;
  }
}
