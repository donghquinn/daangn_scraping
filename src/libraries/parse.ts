import { getHtml } from "./getHtml";
import { text, load } from "cheerio";
import { Logger } from "utils";
import axios from "axios";

// 지역 정보 스크레이핑
export async function parseRegion() {
  const regionArray: Array<string> = [];

  const html = await getHtml();

  if (!html) {
    throw new Error("No Html");
  }

  try {
    const $ = load(html.data);
    const $bodyList = $(".card-desc");

    // .children("article.card-top")
    // .children("card-desc");
    const region = $bodyList
      .children("div.card-region-name")
      .text()
      .split("\n")
      .find((data) => {
        if (data.length !== 6 && data.length !== 0) {
          const regionData = data.trim();

          regionArray.push(regionData);
        }
      });

    Logger.info(`[REGION_SCRPAER] FOUND Regions: ${regionArray.length}`);
    // console.log(regionArray);

    return regionArray;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[REGION_SCRAPER] Scraping Error :${error.message}`);
    }
  }
}

// URL 정보 스크레이핑
export async function parseUrl() {
  let urlArray: Array<string> = [];

  const html = await getHtml();

  if (!html) {
    throw new Error("No Html");
  }

  try {
    const $ = load(html.data);

    const $href = $(".card-link");

    const url = $href.map((index, data) => {
      const href = data.attribs.href.split("=");
      const link = href[href.length - 1];

      const uri = "https://www.daangn.com" + link.trim();

      urlArray.push(uri);
    });

    Logger.info(`[URL_SCRAPER] Found ${urlArray.length}`);

    return urlArray;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[URL_SCRAPER] URL Scraping Error: ${error.message}`);
    }
  }
}

// 카테고리 정보 스크레이핑
export async function parseCategory() {
  const categoryArray: Array<string> = [];

  const url = await parseUrl();

  if (!url) {
    throw new Error("[CATEGORY] No Url Found Here. Ignored");
  }

  try {
    for (let i = 0; i < url.length - 1; i += 1) {
      const html = await axios.get(url[i]);

      const $ = load(html.data);

      const category = $("p[id='article-category']").text().split("∙")[0];

      // Logger.info(`${category}`);

      if (!category) {
        Logger.debug("[CATEGORY] No Category Found");
      }

      const categoryData = category.trim();

      // Logger.info(`[CATERGORY] ${category}`);
      categoryArray.push(categoryData);
    }

    Logger.info(`[CATEGORY_SCRAPER] Found Categories: ${categoryArray.length}`);

    return categoryArray;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `[CATEGORY_SCRAPER] Category Scraping Error: ${error.message}`
      );
    }
  }
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
