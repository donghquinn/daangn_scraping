import { Context } from "koa";
import { Mysql } from "libraries/database";
import { setErrorResponse } from "libraries/request.lib";
import { selectRegion } from "queries/select-data";
import { GetRegion } from "types/sql.types";

async function getBestRegion(ctx: Context) {
  try {
    const [...region] = await Mysql.query<GetRegion[]>(selectRegion);

    // 전체 데이터 지역 정리
    const totalArray: string[] = [];

    // 지역 리스트
    const regionArray: string[] = [];

    for (let regions in region) {
      const splittedRegion = regions.split(" ")[1];

      totalArray.push(splittedRegion);

      // 배열 내부에 파싱 된 지역이 있다면 얼리 리턴 - 지역 리스트만 뽑으려고 함
      if (regionArray.includes(splittedRegion)) {
        return;
      }

      regionArray.push(splittedRegion);
    }

    // 이제 totalArray의 각 지역들을 가지고 regionArray에 있는 각각의 지역들에 카운트
  } catch (error) {
    setErrorResponse(ctx, 500, "[Get Best Region Error Found]");
  }
}
