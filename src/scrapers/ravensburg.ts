import { Scraper } from '../scraper';

class Ravensburg extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.rv.de/corona',
            /(?<cumulatedInfected>\d+)\s+bekannte\s+Coronavirus-Infektionsfälle<\/strong><br>\s*davon sind <strong>(?<cumulatedRecoved>\d+) Personen wieder gesund/
        );
        return {
            ...groups,
            NUTS: 'DE148'
        };
    }
}

export const scraper = new Ravensburg();