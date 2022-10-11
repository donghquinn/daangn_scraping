import { Scraping } from "libraries";
import { parseCategory, parseRegion, parseUrl } from "./libraries/parse";

// await parseRegion();
// // await parseUrl();
const scrape = Scraping.getInstance();

scrape.start();
