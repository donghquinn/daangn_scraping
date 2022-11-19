import { Sql } from "types/sql.types";

export const selectTotalCount: Sql = `
SELECT
  COUNT(*) as count
FROM
  ${process.env.TABLE}
`;

export const selectCombined: Sql = `
SELECT
  category, region, updated
FROM
  ${process.env.TABLE}
`;

export const selectCategories: Sql = `
SELECT
  category
FROM
  ${process.env.TABLE}
`;

export const selectRegion: Sql = `
SELECT
  region
FROM
  ${process.env.TABLE}
`;

export const selectRegionLists: Sql = `
  SELECT
  DISTINCT
    region
  FROM
    ${process.env.TABLE}
`;

export const selectCategoryList: Sql = `
  SELECT
  DISTINCT
    category
  FROM 
    ${process.env.TABLE}
`;

export const selectCategoryAndRegion: Sql = `
  SELECT
    category
  FROM
    ${process.env.TABLE}    
`;

export const queryCategoriesPerRegion: Sql = `
  SELECT
   SUBSTRING_INDEX(SUBSTRING_INDEX(T.region, ' ', 2), ' ', 2) as regions, T.category, COUNT(T.category) as categorycount
  FROM
    ${process.env.TABLE} as T
  GROUP BY
    regions
  ORDER BY
    categorycount DESC
`;
