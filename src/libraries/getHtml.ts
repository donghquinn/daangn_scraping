import axios from "axios";

export async function getHtml() {
  try {
    return await axios.get("https://www.daangn.com/hot_articles");
  } catch (error) {
    console.error(error);
  }
}
