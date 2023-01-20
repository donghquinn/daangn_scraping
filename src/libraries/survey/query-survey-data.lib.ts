import { SurveyError } from "error/servey.error";
import { Mysql } from "libraries/database";
import {
  selectTotalAgeCount,
  selectTotalCountSurvey,
  selectTotalPlatformCount,
  selectTotalReasons,
} from "queries/select-data";
import {
  ReasonsWithPlatformResult,
  SurveyPlatformsQuery,
  SurveyQueryCount,
  SurveyTotalCount,
  totalAgeReturnData,
} from "types/survey-answer.types";
import { surveyDataInput } from "./insert-database.lib";

export async function selectSurveyData() {
  const ageArray = [
    "10세 미만",
    "10세 이상 20세 미만",
    "20세 이상 30세 미만",
    "30세 이상 40세 미만",
    "40세 이상 50세 미만",
    "50세 이상 60세 미만",
    "60세 미만",
  ];

  // 제네릭한 오브젝
  const returnObject: totalAgeReturnData = {};

  // 플랫폼 별 카운트 개수
  const platformReturnData: Array<SurveyPlatformsQuery> = [];
  const reasonsWithPlatforms: Array<ReasonsWithPlatformResult> = [];

  try {
    // 전체 설문조사 응답 수
    const { surveytotal } = await Mysql.query<SurveyTotalCount>(
      selectTotalCountSurvey
    );

    // 전체 나이대 카운트
    ageArray.filter(async (ages) => {
      const { count } = await Mysql.query<SurveyQueryCount>(
        selectTotalAgeCount,
        [ages]
      );

      returnObject[ages] = count;
    });

    // 플랫폼별 카운트 개수. 기타 부분에 어떤게 들어갔을지 모르므로 그룹화 사용
    const [...totalPlatform] = await Mysql.query<SurveyPlatformsQuery[]>(
      selectTotalPlatformCount
    );

    for (let i = 0; i < totalPlatform.length; i = +1) {
      platformReturnData.push({
        platforms: totalPlatform[i].platforms,
        count: totalPlatform[i].count,
      });
    }

    // 플랫폼 별 사용하지 않는 이유
    for (let i = 0; i < platformReturnData.length; i += 1) {
      const [...totalReasons] = await Mysql.query<ReasonsWithPlatformResult[]>(
        selectTotalReasons,
        [platformReturnData[i].platforms]
      );

      for (let j = 0; j < totalReasons.length; j += 1) {
        reasonsWithPlatforms.push({
          platforms: totalReasons[j].platforms,
          reasons: totalReasons[j].reasons,
          count: totalReasons[i].count,
        });
      }
    }

    return {
      surveytotal,
      returnObject,
      platformReturnData,
      reasonsWithPlatforms,
    };
  } catch (error) {
    throw new SurveyError(
      "[SURVEY]",
      "UNHANDABLE ERROR",
      error instanceof Error ? error : new Error(JSON.stringify(error))
    );
  }
}

export async function getSurveyData(
  age: string,
  platforms: string,
  reasons: string
) {
  try {
    // 데이터 DB에 저장
    await surveyDataInput(age, platforms, reasons);
  } catch (error) {
    throw new SurveyError(
      "[SURVEY]",
      "UNHANDABLE ERROR",
      error instanceof Error ? error : new Error(JSON.stringify(error))
    );
  }
}
