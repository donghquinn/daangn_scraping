import { getHtml } from "./getHtml";
import { text, load } from "cheerio";
import { Logger } from "utils/logger.utils";

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

  const $ = load(html.data);

  const $href = $(".card-link");

  const url = $href.map((index, data) => {
    const href = data.attribs.href.split("=");
    const link = href[href.length - 1];

    urlArray.push("https://www.daangn.com/hot_articles" + link);
  });

  Logger.info(urlArray);
  console.log(urlArray);

  return urlArray;
}
