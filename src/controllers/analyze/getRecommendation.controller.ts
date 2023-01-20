import { Context } from "koa";
import { Mysql } from "libraries/database";
import { queryCategoriesPerRegion } from "queries/select-data";
import { CategoryPerRegion } from "types/bestRegion.types";
import { setErrorResponse, setResponse } from "utils/request.lib";

export async function getRecommendation(ctx: Context) {
  // 전체 데이터 지역 정리 - 쿼리 결과에서 두번째 지역 정보만 넣은 그대로
  // const totalArray: string[] = [];

  // // 지역 리스트
  // const regionArray: string[] = [];

  // const categoryData: RegionScoreObject = {};

  // const regionData: RegionScoreObject = {};

  try {
    // const [regionResult] = await Mysql.query<GetRegion[]>(selectRegionLists);
    // const [categoryResult] = await Mysql.query<GetCategory[]>(
    //   selectCategoryList
    // );

    const categoryPerRegion = await Mysql.query<CategoryPerRegion>(
      queryCategoriesPerRegion
    );

    setResponse(ctx, 200, categoryPerRegion);
  } catch (error) {
    setErrorResponse(ctx, 500, JSON.stringify(error));
  }
}
