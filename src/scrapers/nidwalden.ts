import { Scraper } from '../scraper';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.nw.ch/gesundheitsamtdienste/6044',
            /Bisher sind (?<cumulatedInfected>\d+) Personen im Kanton Nidwalden positiv auf das Coronavirus getestet worden/
        );
        return {
            NUTS: 'CH065',
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected)
        };
    }
}

export const scraper = new ScraperImpl();