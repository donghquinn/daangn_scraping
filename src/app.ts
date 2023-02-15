import "./env";

const bootstrap = async () => {
  const { Scraping } = await import("libraries/manager");
  const { KoaServer } = await import("./server");

  const scrape = Scraping.getInstance();
  const server = new KoaServer();

  server.start();
  scrape.start();
};

await bootstrap();
