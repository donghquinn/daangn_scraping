import { Scraping } from "libraries";
import { KoaRouter } from "server";

// await parseRegion();
// // await parseUrl();
const scrape = Scraping.getInstance();
const server = new KoaRouter();

server.start();
scrape.start();
