import { Sql } from "types/sql.types";

export const insertUrlAndRegion: Sql = `
  INSERT INTO ${process.env.TABLE}
    (region, url, category)
  VALUES
    (?, ?, ?)
`;
