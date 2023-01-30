/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { Sql } from "types/sql.types";

export const insertUrlAndRegion: Sql = `
  INSERT INTO ${process.env.TABLE}
    (region, url, category)
  VALUES
    (?, ?, ?)
`;

export const insertSurveyAnswer: Sql = `
  INSERT INTO ${process.env.SURVEY}
    (age, platforms, reasons)
  VALUES
    (?, ?, ?)
`;
