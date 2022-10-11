import { getHtml } from "./getHtml";
import { text, load } from "cheerio";
import { Logger } from "utils/logger.utils";

export async function parseRegion() {
  const regionArray = [];
  const html = await getHtml();

  if (!html) {
    return console.log("No Html");
  }

  const $ = load(html.data);
  const $bodyList = $(".card-desc");

  // .children("article.card-top")
  // .children("card-desc");
  const region = $bodyList.children("div.card-region-name").toArray();

  Logger.info(region);
  console.log(region);

  return region;
}

export async function parseUrl() {
  const html = await getHtml();

  if (!html) {
    return console.log("No Html");
  }

  const $ = load(html.data);

  const $href = $(".card-link");

  const url = $href.attr("href");

  Logger.info(url);

  return url;
}
