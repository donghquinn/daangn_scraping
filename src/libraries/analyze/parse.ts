/* eslint-disable @typescript-eslint/no-unsafe-argument */
import axios from "axios";
import { load } from "cheerio";
import { ParseError } from "error/parse.error";
import { CrawlLogger } from "utils/logger.utils";
import { getHtml } from "./getHtml";

// 지역 정보 스크레이핑
export async function parseRegion() {
  const regionArray: Array<string> = [];

  const html = await getHtml();

  if (!html) {
    CrawlLogger.error("No Html provieded. Ignore.");

    throw new ParseError("Parse Error", "No Html");
  }

  try {
    const $ = load(html.data);
    const $bodyList = $(".card-desc");

    $bodyList
      .children("div.card-region-name")
      .text()
      .split("\n")
      .find((data) => {
        if (data.length !== 6 && data.length !== 0) {
          const regionData = data.trim();

          regionArray.push(regionData);

          return regionArray;
        }

        return null;
      });

    CrawlLogger.info(`[REGION_SCRPAER] FOUND Regions: ${regionArray.length}`);

    return regionArray;
  } catch (error) {
    CrawlLogger.error("Scraping Error: %o", {
      error: error instanceof Error ? error : new Error(JSON.stringify(error)),
    });

    throw new ParseError(
      `[REGION_SCRAPER]`,
      ` Scraping Error `,
      error instanceof Error ? error : new Error(JSON.stringify(error))
    );
  }
}

// URL 정보 스크레이핑
export async function parseUrl() {
  const urlArray: Array<string> = [];

  const html = await getHtml();

  if (!html) {
    CrawlLogger.error("Parsing Url Error: No Html Provided. Ignore.");

    throw new ParseError("Parse Error", "No Html Provided");
  }

  try {
    const $ = load(html.data);

    const $href = $(".card-link");

    for (let i = 0; i < $href.length; i += 1) {
      const href = $href[i].attribs.href.split("=");

      const link = href[href.length - 1];

      const uri = `https://www.daangn.com${link.trim()}`;

      urlArray.push(uri);
    }

    CrawlLogger.info(`[URL_SCRAPER] Found ${urlArray.length}`);

    return urlArray;
  } catch (error) {
    CrawlLogger.error("URL Scraping Error: %o", {
      error: error instanceof Error ? error : new Error(JSON.stringify(error)),
    });

    throw new ParseError(
      `[URL_SCRAPER] `,
      "URL Scraping Error",
      error instanceof Error ? error : new Error(JSON.stringify(error))
    );
  }
}

// 카테고리 정보 스크레이핑
export async function parseCategory() {
  const categoryArray: Array<string> = [];

  const url = await parseUrl();

  if (!url) {
    CrawlLogger.error("Category Parsing: No Url Priveded. Ignored.");

    throw new ParseError("[CATEGORY]", "No Url Found Here. Ignored");
  }

  try {
    for (let i = 0; i < url.length - 1; i += 1) {
      const html = await axios.get(url[i]);

      const $ = load(html.data);

      const category = $("p[id='article-category']").text().split("∙")[0];

      // Logger.info(`${category}`);

      if (!category) {
        CrawlLogger.debug("[CATEGORY] No Category Found");
      }

      const categoryData = category.trim();

      // Logger.info(`[CATERGORY] ${category}`);
      categoryArray.push(categoryData);
    }

    CrawlLogger.info(
      `[CATEGORY_SCRAPER] Found Categories: ${categoryArray.length}`
    );

    return categoryArray;
  } catch (error) {
    CrawlLogger.error("Category Scraper Error: %o", {
      error: error instanceof Error ? error : new Error(JSON.stringify(error)),
    });

    throw new ParseError(
      `[CATEGORY_SCRAPER] `,
      `Category Scraping Error`,
      error instanceof Error ? error : new Error(JSON.stringify(error))
    );
  }
}
