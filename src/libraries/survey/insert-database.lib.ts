import { SurveyError } from "error/servey.error";
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
    throw new SurveyError(
      "[SURVEY]",
      "UNHANDABLE ERROR",
      error instanceof Error ? error : new Error(JSON.stringify(error))
    );
  }
}
