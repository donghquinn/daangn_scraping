import { Context } from "koa";
import { Mysql } from "libraries/database";
import { setErrorResponse, setResponse } from "libraries/request.lib";
import { selectCategories } from "queries/select-data";
import { RegionScoreObject } from "types/bestRegion.types";
import { GetCategory } from "types/sql.types";
import { Logger } from "utils";

export async function getCategoryScore(ctx: Context) {
  // 전체 데이터 지역 정리 - 쿼리 결과에서 두번째 지역 정보만 넣은 그대로
  // const totalArray: string[] = [];

  // 지역 리스트
  // const categoryArray: string[] = [];

  const returnData: RegionScoreObject = {};

  try {
    Logger.info("[Region_Score] Region Query");

    const [...category] = await Mysql.query<GetCategory[]>(selectCategories);

    Logger.info("[Region_Score] Queried Data : %o", category);

    category.find((item) => {
      const categoryList = item.category;

      if (returnData[categoryList]) {
        returnData[categoryList] = returnData[categoryList] + 1;
      }

      if (!returnData[categoryList]) {
        returnData[categoryList] = 1;
      }
    });

    // TODO 위에서 동적으로 생성한 객체의 value값을 기준으로 내림차순...

    return setResponse(ctx, 200, { returnData });
  } catch (error) {
    setErrorResponse(ctx, 500, "[Get Best Category Error Found]");
  }
}
