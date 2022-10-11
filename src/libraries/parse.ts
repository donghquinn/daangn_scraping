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

      urlArray.push("https://www.daangn.com" + link);
    });

    Logger.info(`[URL_SCRAPER] Found ${urlArray.length}`);

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
    throw new Error("[CATEGORY] No Url Found Here. Ignored");
  }

  for (let i = 0; i < url.length - 1; i += 1) {
    const html = await axios.get(url[i]);

    const $ = load(html.data);

    const category = $("p[id='article-category']").text().split("∙")[0];

    if (!category) {
      Logger.debug("[CATEGORY] No Category Found");
    }

    Logger.info("[CATEGORY] Category Found");

    // Logger.info(`[CATERGORY] ${category}`);
    categoryArray.push(category);
  }

  return categoryArray;
}

// const category = url.find(async (uri) => {
//   try {
//     const html = await axios.get(uri);

//     const $ = load(html.data);

//     const category = $("p[id='article-category']").text()

//     if (!category) {
//       Logger.debug("[CATEGORY] No Category Found");
//     }

//     Logger.info("[CATEGORY] Category Found");

//     Logger.info(`[CATERGORY] ${category}`);
//     categoryArray.push(category);
// } catch (error) {
//   if (error instanceof Error) {
//     throw new Error("CATEGORY Error");
// //   }
//     // }
//   });

//   return categoryArray;
// }
