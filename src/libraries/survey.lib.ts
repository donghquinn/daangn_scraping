import { DefaultContext } from "koa";
import { Logger } from "utils";
import { surveyAnswerValidate } from "utils/survey-answer.validator";
import { Logform } from "winston";
import { setErrorResponse } from "./request.lib";

export async function surveyControl(ctx: DefaultContext) {
  try {
    Logger.info("[SURVEY] Validate Start");

    const { platforms, reasons } = await surveyAnswerValidate.validateAsync(
      ctx.request.body
    );
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
