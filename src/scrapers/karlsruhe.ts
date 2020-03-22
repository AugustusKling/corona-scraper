import { Scraper } from '../scraper';

class Karlsruhe extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://corona.karlsruhe.de/',
            /Stadt Karlsruhe: (\d+),[^]*?davon \d+ aus Quarantäne entlassen[^]+?Landkreis Karlsruhe: (\d+),[^]*?davon \d+ aus Quarantäne entlassen/
        );
        return [
            {
                NUTS: 'DE122',
                cumulatedInfected: parseInt(matches[1], 10)
            },{
                NUTS: 'DE123',
                cumulatedInfected: parseInt(matches[2], 10)
            }
        ];
    }
}

export const scraper = new Karlsruhe();