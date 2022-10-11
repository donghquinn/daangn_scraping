import { getHtml } from "./getHtml";
import { text, load } from "cheerio";

export async function parseHtml() {
  const html = await getHtml();

  if (!html) {
    return console.log("No Html");
  }

  const $ = load(html.data);
  const $bodyList = $(".card-desc");
  // .children("article.card-top")
  // .children("card-desc");
  const region = $bodyList.children("div.card-region-name").text();
  const goods = $bodyList.children("h2.card-title");
  // const result = $bodyList.html($("article"));
  const keyword = $(".keyword");
  console.log($bodyList);

  console.log(region);
  console.log(goods);
}
