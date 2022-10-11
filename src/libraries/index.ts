export class Scraping {
  private static instance: Scraping;

  private isStarted: boolean;

  constructor() {
    this.isStarted = true;
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new Scraping();
    }

    return this.instance;
  }

  start() {
    if (!this.isStarted) {
      const scraper = Scraping.getInstance();
    }
  }
}
