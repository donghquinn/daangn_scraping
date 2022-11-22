import { DefaultContext } from "koa";
import { Logger } from "utils";
import { surveyAnswerValidate } from "utils/survey-answer.validator";
import { setErrorResponse } from "./request.lib";

export async function surveyControl(ctx: DefaultContext) {
  try {
    Logger.info("[SURVEY] Validate Start");

    const { age, platforms, reasons } =
      await surveyAnswerValidate.validateAsync(ctx.request.body);

    const response = await 
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
