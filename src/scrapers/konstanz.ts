import { Scraper } from '../scraper';

class Konstanz extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lrakn.de/,Lde/service-und-verwaltung/aemter/gesundheit+und+versorgung/coronavirus',
            /Nach dieser Zählweise steigt die Zahl der erkrankten Personen auf (?<cumulatedInfected>\d+)\.[^]+(?<cumulatedRecovered>\d+) Personen gelten als genesen/
        );
        return {
            ...groups,
            NUTS: 'DE138'
        };
    }
}

export const scraper = new Konstanz();