import { Scraper } from '../scraper';

class Ravensburg extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.rv.de/corona',
            /Derzeit\s+gibt es bei uns <strong>(?<cumulatedInfected>\d+) bekannte\s+Coronavirus-Infektionsfälle[^]+Unter diesen bestätigten\s+Fällen sind <strong>(?<cumulatedRecoved>\d+) Personen wieder als\s+gesund<\/strong> diagnostiziert/
        );
        return {
            NUTS: 'DE148',
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedRecoved: this.parseNumber(groups.cumulatedRecoved)
        };
    }
}

export const scraper = new Ravensburg();