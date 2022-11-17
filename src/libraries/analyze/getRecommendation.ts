import { MysqlError } from "error/mysql.error";
import { Context } from "koa";
import { Mysql } from "libraries/database";
import { selectCategories, selectRegion } from "queries/select-data";
import { RegionScoreObject } from "types/bestRegion.types";
import { GetCategory, GetRegion } from "types/sql.types";
import { Logger } from "utils";

export async function getRecommendation(ctx: Context) {
  // 전체 데이터 지역 정리 - 쿼리 결과에서 두번째 지역 정보만 넣은 그대로
  const totalArray: string[] = [];

  // 지역 리스트
  const regionArray: string[] = [];

  const categoryData: RegionScoreObject = {};

  const regionData: RegionScoreObject = {};

  try {
    Logger.info("[Recommandation] Region Query");

    const [...region] = await Mysql.query<GetRegion[]>(selectRegion);

    Logger.info("[Recommandation] Queried Data : %o", region);

    region.find((item) => {
      const splittedRegion = item.region.split(" ")[1];

      if (regionData[splittedRegion]) {
        regionData[splittedRegion] = regionData[splittedRegion] + 1;
      }

      if (!regionData[splittedRegion]) {
        regionData[splittedRegion] = 1;
      }
    });

    Logger.info("[Region_Score] Region Query");

    const [...category] = await Mysql.query<GetCategory[]>(selectCategories);

    Logger.info("[Region_Score] Queried Data : %o", category);

    category.find((item) => {
      const categoryList = item.category;

      if (categoryData[categoryList]) {
        categoryData[categoryList] = categoryData[categoryList] + 1;
      }

      if (!categoryData[categoryList]) {
        categoryData[categoryList] = 1;
      }
    });
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
