import { CommonError } from "error/common.error";
import { insertUrlAndRegion } from "queries/insertQueryData";
import { setIntervalAsync } from "set-interval-async";
import { CommonLogger, Logger } from "utils/logger.utils";
import { Mysql } from "./database/Mysql.lib";
import { parseCategory, parseRegion, parseUrl } from "./analyze/parse";

export class Scraping {
  private static instance: Scraping;

  private isStarted: boolean;

  constructor() {
    this.isStarted = true;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Scraping();
    }

    return this.instance;
  }

  start() {
    if (!this.isStarted) {
      Logger.info("[Scraper] Is Not Listening");

      return;
    }

    Logger.info(`[SCRAPER] Scraping Start: ${Date()}`);

    setIntervalAsync(async () => {
      const url = await parseUrl();
      const region = await parseRegion();
      const category = await parseCategory();

      if (!region) {
        CommonLogger.error("Scraper Error: Could Not Scrape Region Data");

        throw new CommonError("[SCRAPER]", "Could Not Scrape Region Data");
      }

      if (!url) {
        CommonLogger.error("Scraper Error: Could Not Scrape Url Data");

        throw new CommonError("[SCRAPER]", "Could not Scrape Url Data");
      }

      if (!category) {
        CommonLogger.error("Scraper Error: Could Not Scrape Category Data");

        throw new CommonError("[SCRAPER]", "Could Not Scrape Category Data");
      }

      for (let i = 0; i < url.length - 1; i += 1) {
        await Mysql.query(insertUrlAndRegion, [region[i], url[i], category[i]]);
      }
    }, Number(process.env.TIME_SET));
  }
}
