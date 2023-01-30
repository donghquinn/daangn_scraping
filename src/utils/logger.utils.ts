import path from "path";
import { fileURLToPath } from "url";
import Winston from "winston";
import WinstonDaily from "winston-daily-rotate-file";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const dirSaveName = path.join(dirName, "..", "..", "logs");

// 로그 포맷 설정
const {
  colorize,
  combine,
  timestamp: defaultTimestamp,
  printf,
  splat,
  json,
} = Winston.format;

const formatted = printf(
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  ({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`
);

class WinstonLogger {
  private static instance: WinstonLogger;

  private commonLogger: Winston.Logger;

  private crawlingLogger: Winston.Logger;

  private logger: Winston.Logger;

  private constructor() {
    this.commonLogger = Winston.createLogger({
      format: combine(
        splat(),
        json(),
        defaultTimestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        formatted
      ),
      transports: [
        new WinstonDaily({
          level: "debug",
          datePattern: "YYYY-MM-DD",
          dirname: dirSaveName,
          filename: "%DATE%.common.log",
          maxFiles: 30,
          zippedArchive: true,
        }),
      ],
    });

    this.crawlingLogger = Winston.createLogger({
      format: combine(
        splat(),
        json(),
        defaultTimestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        formatted
      ),
      transports: [
        new WinstonDaily({
          level: "debug",
          datePattern: "YYYY-MM-DD",
          dirname: dirSaveName,
          filename: "%DATE%.crawl.log",
          maxFiles: 30,
          zippedArchive: true,
        }),
      ],
    });

    this.logger = Winston.createLogger({
      format: combine(
        splat(),
        json(),
        defaultTimestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        formatted
      ),
      transports: [
        new WinstonDaily({
          level: "error",
          datePattern: "YYYY-MM-DD",
          dirname: dirSaveName,
          filename: "%DATE%.error.log",
          maxFiles: 100,
          zippedArchive: true,
        }),
        new WinstonDaily({
          level: process.env.NODE_ENV === "production" ? "info" : "debug",
          datePattern: "YYYY-MM-DD",
          dirname: dirSaveName,
          filename: "%DATE%.combined.log",
          maxFiles: 100,
          zippedArchive: true,
        }),
      ],
    });

    if (process.env.NODE_ENV !== "production") {
      this.logger.add(
        new Winston.transports.Console({
          format: combine(colorize(), formatted),
        })
      );
    }
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new WinstonLogger();
    }

    return {
      CommonLogger: this.instance.commonLogger,
      Logger: this.instance.logger,
      CrawlLogger: this.instance.crawlingLogger,
    };
  }
}

const { CommonLogger, Logger, CrawlLogger } = WinstonLogger.getInstance();

export { CommonLogger, Logger, CrawlLogger };
