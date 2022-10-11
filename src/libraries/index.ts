import { insertUrlAndRegion } from "queries/insertQueryData";
import { Logger } from "utils/logger.utils";
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

  async start() {
    if (!this.isStarted) {
      Logger.info("[Scraper] Is Not Listening");
    }

    const region = await parseRegion();
    const url = await parseUrl();
    const category = await parseCategory();

    if (!region) {
      throw new Error("Could not Scrape Region Data");
    }

    if (!url) {
      throw new Error("Could not Scrape Url Data");
    }

    if (region.length !== url.length) {
      throw new Error("Total Is not matched");
    }

    for (let i = 0; i < url.length - 1; i += 1) {
      await Mysql.query(insertUrlAndRegion, [region[i], url[i], category[i]]);
    }
  }
}
