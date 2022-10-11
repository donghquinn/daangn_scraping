import axios from "axios";

export async function getHtml() {
  try {
    return await axios.get(
      "https://www.daangn.com/region/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C"
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`[FETCH] ${error.message}`);
    }
  }
}
