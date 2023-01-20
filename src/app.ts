import "./env";

import { Scraping } from "libraries/manager";
import { KoaRouter } from "server";

// await parseRegion();
// // await parseUrl();
const scrape = Scraping.getInstance();
const server = new KoaRouter();

server.start();
scrape.start();
