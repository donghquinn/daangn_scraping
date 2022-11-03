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
