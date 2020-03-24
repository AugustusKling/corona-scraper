import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Karlsruhe extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://corona.karlsruhe.de/',
            /Stadt Karlsruhe: (?<stadt>\d+)[^]+Landkreis Karlsruhe: (?<landkreis>\d+)[^]+?Zuletzt aktualisiert: (?<updateDate>.+?) Uhr/
        );
        const updateDate = moment.tz(groups.updateDate, 'DD. MMM, HH:mm', 'de', 'Europe/Berlin').toISOString()
        return [
            {
                // Stadt Karlsruhe
                NUTS: 'DE122',
                cumulatedInfected: this.parseNumber(groups.stadt),
                updateDate
            },
            {
                // Landkreis Karlsruhe
                NUTS: 'DE123',
                cumulatedInfected: this.parseNumber(groups.landkreis),
                updateDate
            }
        ];
    }
}

export const scraper = new Karlsruhe();