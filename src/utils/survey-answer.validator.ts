import Joi from "joi";
import { SurveyAnswerCtx } from "types/survey-answer.types";

export const surveyAnswerValidate = Joi.object<SurveyAnswerCtx>({
  platforms: Joi.string().required(),
  reasons: Joi.string().required(),
}).options({ stripUnknown: true });
