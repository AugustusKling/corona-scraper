export abstract class Scraper {
    constructor(public readonly id: string) {}

    abstract get(): Promise<object & { scrapedAt: string; }>;
}