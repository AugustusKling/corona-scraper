import { Scraper } from '../scraper';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.ortenaukreis.de/corona',
            /Zahl der bestätigten Corona-Infizierten(?: im Ortenaukreis)?(?: steigt)? auf (\d+)/
        );
        return {
            NUTS: 'DE134',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new ScraperImpl();