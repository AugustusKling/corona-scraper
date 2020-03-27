import { Scraper } from '../scraper';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.ortenaukreis.de/corona',
            /(?:Zahl|Fallzahl) der bestätigten Corona-Infizierten(?: im Ortenaukreis)?(?: steigt)? auf (?<cumulatedInfected>\d+)/
        );
        return {
            ...groups,
            NUTS: 'DE134'
        };
    }
}

export const scraper = new ScraperImpl();