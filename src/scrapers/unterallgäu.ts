import { Scraper } from '../scraper';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.landratsamt-unterallgaeu.de/buergerservice/gesundheit/coronavirus.html',
            /Im Unterallgäu gibt es (\d+) Corona-Fälle/
        );
        return {
            NUTS: 'DE27C',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new ScraperImpl();