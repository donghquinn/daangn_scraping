import { Context } from "koa";
import { Mysql } from "libraries/database";
import { selectRegion } from "queries/select-data";
import { RegionScoreObject } from "types/bestRegion.types";
import { GetRegion } from "types/sql.types";
import { setErrorResponse, setResponse } from "utils/request.lib";

export async function getRegionScore(ctx: Context) {
  // 전체 데이터 지역 정리 - 쿼리 결과에서 두번째 지역 정보만 넣은 그대로
  // const totalArray: string[] = [];

  // 지역 리스트
  // const regionArray: string[] = [];

  const returnData: RegionScoreObject = {};

  try {
    const [...region] = await Mysql.query<GetRegion[]>(selectRegion);

    for (let i = 0; i < region.length; i += 1) {
      const splittedRegion = region[i].region.split(" ")[1];

      if (returnData[splittedRegion]) {
        returnData[splittedRegion] += 1;
      }

      if (!returnData[splittedRegion]) {
        returnData[splittedRegion] = 1;
      }
    }

    // TODO 위에서 동적으로 생성한 객체의 value값을 기준으로 내림차순...

    setResponse(ctx, 200, { returnData });
  } catch (error) {
    setErrorResponse(ctx, 500, "[Get Best Region Error Found]");
  }
}
