import { getHtml } from "./getHtml";
import { text, load } from "cheerio";
import { Logger } from "utils/logger.utils";
import axios from "axios";

export async function parseRegion() {
  const regionArray: Array<string> = [];

  const html = await getHtml();

  if (!html) {
    return console.log("No Html");
  }

  const $ = load(html.data);
  const $bodyList = $(".card-desc");

  // .children("article.card-top")
  // .children("card-desc");
  const region = $bodyList
    .children("div.card-region-name")
    .text()
    .split("\n")
    .find((data) => {
      regionArray.push(data);
    });

  Logger.info(regionArray);
  console.log(regionArray);

  return regionArray;
}

export async function parseUrl() {
  let urlArray: Array<string> = [];

  const html = await getHtml();

  if (!html) {
    return console.log("No Html");
  }

  try {
    const $ = load(html.data);

    const $href = $(".card-link");

    const url = $href.map((index, data) => {
      const href = data.attribs.href.split("=");
      const link = href[href.length - 1];

      Logger.info(`[URL_SCRAPER] https://www.daangn.com/hot_articles${link}`);
      urlArray.push("https://www.daangn.com/hot_articles" + link);
    });

    return urlArray;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("URL_SCRAPING FAILED");
    }
  }
}

export async function parseCategory() {
  const categoryArray: Array<string> = [];

  const url = await parseUrl();

  if (!url) {
    return Logger.debug("[CATEGORY] No Url Found Here. Ignored");
  }

  const category = url.find(async (uri) => {
    const html = await axios.get(uri);
    const $ = load(html.data);

    const category = $(".article-category").text();

    Logger.info("[CATEGORY] Category Found");

    categoryArray.push(category);
  });

  return categoryArray;
}
