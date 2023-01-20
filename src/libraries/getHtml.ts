import axios from "axios";
import { ParseError } from "error/parse.error";

export async function getHtml() {
  try {
    const result = await axios.get(
      "https://www.daangn.com/region/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C"
    );

    return result;
  } catch (error) {
    throw new ParseError(
      `[FETCH] `,
      "GET HTML ERROR",
      error instanceof Error ? error : new Error(JSON.stringify(error))
    );
  }
}
