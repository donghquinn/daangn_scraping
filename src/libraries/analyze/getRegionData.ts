import { Context } from "koa";
import { Mysql } from "libraries/database";
import { setErrorResponse, setResponse } from "libraries/request.lib";
import { selectRegion } from "queries/select-data";
import { RegionScoreObject } from "types/bestRegion.types";
import { GetRegion } from "types/sql.types";
import { Logger } from "utils";

export async function getRegionScore(ctx: Context) {
  // 전체 데이터 지역 정리 - 쿼리 결과에서 두번째 지역 정보만 넣은 그대로
  // const totalArray: string[] = [];

  // 지역 리스트
  // const regionArray: string[] = [];

  const returnData: RegionScoreObject = {};

  try {
    Logger.info("[Region_Score] Region Query");

    const [...region] = await Mysql.query<GetRegion[]>(selectRegion);

    region.find((item) => {
      const splittedRegion = item.region.split(" ")[1];

      if (returnData[splittedRegion]) {
        returnData[splittedRegion] = returnData[splittedRegion] + 1;
      }

      if (!returnData[splittedRegion]) {
        returnData[splittedRegion] = 1;
      }
    });

    // TODO 위에서 동적으로 생성한 객체의 value값을 기준으로 내림차순...

    return setResponse(ctx, 200, { returnData });
  } catch (error) {
    setErrorResponse(ctx, 500, "[Get Best Region Error Found]");
  }
}
