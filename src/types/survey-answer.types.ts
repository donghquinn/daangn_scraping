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

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface totalAgeReturnData {
  [key: string]: string;
}

export interface ReasonsWithPlatformResult {
  platforms: string;
  reasons: string;
  count: string;
}
