import { MysqlError } from "error/mysql.error";
import { Mysql } from "libraries/database";
import { insertSurveyAnswer } from "queries/insertQueryData";
import { Logger } from "utils/logger.utils";

export async function surveyDataInput(
  age: string,
  platforms: string,
  reasons: string
) {
  try {
    await Mysql.query(insertSurveyAnswer, [age, platforms, reasons]);

    Logger.info("[SURVEY] Answer Update Completed");
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError("[SURVEY]", "MYSQL ERROR", error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError("[SURVEY]", "NOT MYSQL ERROR", error.message);
    }

    throw new MysqlError("[SURVEY]", "UNHANDABLE ERROR", JSON.stringify(error));
  }
}
