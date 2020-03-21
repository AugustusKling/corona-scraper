import { Scraper } from '../scraper';

class KarlsruheLandkreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://corona.karlsruhe.de/',
            /Landkreis Karlsruhe: (\d+),\s*<em><br \/>davon \d+ aus Quarantäne entlassen/
        );
        return {
            NUTS: 'DE123',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new KarlsruheLandkreis();