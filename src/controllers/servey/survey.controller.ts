import { DefaultContext } from "koa";
import { Logger } from "utils";
import { surveyAnswerValidate } from "utils/survey-answer.validator";
import {
  getSurveyData,
  selectSurveyData,
} from "../../libraries/survey/query-survey-data.lib";
import { setErrorResponse, setResponse } from "../../utils/request.lib";

export async function surveyControl(ctx: DefaultContext) {
  try {
    Logger.info("[SURVEY] Validate Start");

    const { age, platforms, reasons } =
      await surveyAnswerValidate.validateAsync(ctx.request.body);

    await getSurveyData(age, platforms, reasons);

    const {
      surveytotal,
      returnObject,
      platformReturnData,
      reasonsWithPlatforms,
    } = await selectSurveyData();

    setResponse(ctx, 200, {
      surveytotal,
      returnObject,
      platformReturnData,
      reasonsWithPlatforms,
    });
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
