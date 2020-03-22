import { Scraper } from '../scraper';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.kreis-heinsberg.de/aktuelles/aktuelles/?pid=5142',
            /(\d+) best.tigte Infektionen/
        );
        return {
            NUTS: 'DEA29',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new ScraperImpl();