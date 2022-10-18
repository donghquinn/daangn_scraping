import { Sql } from "types/sql.types";

export const selectTotalCount: Sql = `
SELECT
  COUNT(*)
FROM
  ${process.env.TABLE}
`;

export const selectCombined: Sql = `
SELECT
  category, region, updated
FROM
  ${process.env.TABLE}
ORDER BY
  updated
`;

export const selectCategories: Sql = `
SELECT
  category, updated
FROM
  ${process.env.TABLE}
ORDER BY
  updated
`;

export const selectRegion: Sql = `
SELECT
  region, updated
FROM
  ${process.env.TABLE}
ORDER BY
  updated
`;
