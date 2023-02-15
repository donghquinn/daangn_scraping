import { MysqlError } from "error/mysql.error";
import { createPool, Pool } from "mysql2/promise";
import { DbQueryResult } from "types/query.types";
import { Sql } from "types/sql.types";
import { CommonLogger, Logger } from "utils/logger.utils";

/**
 * 데이터베이스 관련 조작 클래스
 */
export class Mysql {
  private static instance: Mysql;

  private isListening: boolean;

  private pool: Pool;

  // DB 연결
  private constructor() {
    this.isListening = true;

    this.pool = createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 30,
      queueLimit: 0,
      supportBigNumbers: true,
      bigNumberStrings: true,
    });
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Mysql();
    }

    return this.instance;
  }

  // DB 쿼리 메소드
  public static async query<T>(
    sql: Sql,
    options?: unknown
  ): Promise<DbQueryResult<T>> {
    try {
      const { pool, isListening } = Mysql.getInstance();

      if (!isListening)
        throw new MysqlError(
          "DB_CLOSED_ERROR",
          "Tried to query after DB closed"
        );

      const [result] = await pool.query<DbQueryResult<T>>(sql, options);

      return result;
    } catch (error) {
      CommonLogger.error("[DATABASE] error: %o", {
        error:
          error instanceof Error ? error : new Error(JSON.stringify(error)),
      });

      // 에러 객체가 아닌 상태로 throw 된 경우
      throw new MysqlError(
        "DB_OTHER_ERROR",
        "THIS_IS_BUG",
        error instanceof Error ? error : new Error(JSON.stringify(error))
      );
    }
  }

  public stop() {
    if (this.pool) {
      this.pool.end();

      Logger.info("[Database] Closed.");
    }
  }
}
