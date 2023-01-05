import Joi from "joi";
import { SurveyAnswerCtx } from "types/survey-answer.types";

export const surveyAnswerValidate = Joi.object<SurveyAnswerCtx>({
  age: Joi.string().required(),
  platforms: Joi.string().required(),
  reasons: Joi.string().required(),
}).options({ stripUnknown: true });
