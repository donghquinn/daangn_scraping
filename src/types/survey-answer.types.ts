export interface SurveyAnswerCtx {
  age: string;
  platforms: string;
  reasons: string;
}

export interface SurveyTotalCount {
  surveytotal: string;
}

export interface SurveyQueryCount {
  count: string;
}

export interface SurveyPlatformsQuery {
  platforms: string;
  count: string;
}

export interface totalAgeReturnData {
  [key: string]: string;
}
