import { Scraper } from '../scraper';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.landkreis-freudenstadt.de/Startseite/Aktuell/aktueller+stand+corona-virus.html',
            /Zahl der Infizierten steigt auf (\d+)/
        );
        return {
            NUTS: 'DE12C',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new ScraperImpl();