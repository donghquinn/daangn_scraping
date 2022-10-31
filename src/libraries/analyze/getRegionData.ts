import { Context } from "koa";
import { Mysql } from "libraries/database";
import { setErrorResponse } from "libraries/request.lib";
import { selectRegion } from "queries/select-data";
import { RegionScoreObject } from "types/bestRegion.types";
import { GetRegion } from "types/sql.types";

export async function getAllRegionList(ctx: Context) {
  // 전체 데이터 지역 정리 - 쿼리 결과에서 두번째 지역 정보만 넣은 그대로
  const totalArray: string[] = [];

  // 지역 리스트
  const regionArray: string[] = [];

  const returnData: RegionScoreObject = {};

  try {
    const region = await Mysql.query<GetRegion[]>(selectRegion);

    for (let regions in region) {
      const splittedRegion = regions.split(" ")[1];

      totalArray.push(splittedRegion);

      // 배열 내부에 파싱 된 지역이 있다면 얼리 리턴 - 지역 리스트만 뽑으려고 함
      if (regionArray.includes(splittedRegion)) {
        return;
      }

      // 만약 해당 지역이 이미 객체에 등록되어 있을 경우 점수 1 추가
      if (returnData[regions]) {
        returnData[regions] + 1;
      }

      // 없을 경우 새롭게 등록
      returnData[regions] = 0;

      regionArray.push(splittedRegion);
    }

    // TODO 위에서 동적으로 생성한 객체의 value값을 기준으로 내림차순...
  } catch (error) {
    setErrorResponse(ctx, 500, "[Get Best Region Error Found]");
  }
}