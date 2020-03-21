import { Scraper } from '../scraper';

class KarlsruheStadtkreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://corona.karlsruhe.de/',
            /Stadt Karlsruhe: (\d+),\s*<em><br \/>davon \d+ aus Quarantäne entlassen/
        );
        return {
            NUTS: 'DE122',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new KarlsruheStadtkreis();