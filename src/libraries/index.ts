import { insertUrlAndRegion } from "queries/insertQueryData";
import { Logger } from "utils";
import { Mysql } from "./database/Mysql.lib";
import { parseCategory, parseRegion, parseUrl } from "./parse";

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
    }

    Logger.info("[SCRAPER] Scraping Start: " + Date());

    setInterval(async () => {
      const url = await parseUrl();
      const region = await parseRegion();
      const category = await parseCategory();

      if (!region) {
        throw new Error("[SCRAPER] Could not Scrape Region Data");
      }

      if (!url) {
        throw new Error("[SCRAPER] Could not Scrape Url Data");
      }

      if (!category) {
        throw new Error("[SCRAPER] Could Not Scrape Category Data");
      }

      // if (region.length !== url.length) {
      //   throw new Error("Total Is not matched");
      // }
      for (let i = 0; i < url.length - 1; i += 1) {
        await Mysql.query(insertUrlAndRegion, [region[i], url[i], category[i]]);
      }
    }, Number(process.env.TIME_SET));
  }
}
