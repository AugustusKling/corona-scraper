import { Scraper } from '../scraper';

class Konstanz extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.lrakn.de/,Lde/service-und-verwaltung/aemter/gesundheit+und+versorgung/coronavirus',
            /Aktuell gibt es im Landkreis Konstanz (\d+) bestätigte Fälle einer Coronavireninfektion./
        );
        return {
            NUTS: 'DE138',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new Konstanz();