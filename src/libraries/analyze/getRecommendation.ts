import { MysqlError } from "error/mysql.error";
import { Context } from "koa";
import { Mysql } from "libraries/database";
import { queryCategoriesPerRegion } from "queries/select-data";
import { CategoryPerRegion } from "types/bestRegion.types";

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

    return categoryPerRegion;
  } catch (error) {
    if (error instanceof MysqlError) {
      throw new MysqlError("[SELECT]", "MYSQL ERROR", error.message);
    }

    if (error instanceof Error) {
      throw new MysqlError("[SELECT]", "NOT MYSQL ERROR", error.message);
    }

    throw new MysqlError("[SELECt]", "UNHANDABLE ERROR", JSON.stringify(error));
  }
}
