import { MysqlError } from "error/mysql.error";
import { Mysql } from "libraries/database";
import {
  selectTotalAgeCount,
  selectTotalCountSurvey,
  selectTotalPlatformCount,
} from "queries/select-data";
import {
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

    totalPlatform.filter((item) => {
      platformReturnData.push({ platforms: item.platforms, count: item.count });
    });

    return { surveytotal, returnObject, platformReturnData };
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

export async function getSurveyData(
  age: string,
  platforms: string,
  reasons: string
) {
  try {
    await surveyDataInput(age, platforms, reasons);
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
