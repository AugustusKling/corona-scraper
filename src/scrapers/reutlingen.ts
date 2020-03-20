import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Reutlingen extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.kreis-reutlingen.de/de/Aktuelles/Landkreis-aktuell/Landkreis-aktuell?view=publish&item=article&id=1923',
            /Stand: (\d\d[.]\d\d[.]\d\d\d\d).+Gesamtzahl laborbestätigter Fälle: (\d+)/
        );
        return {
            NUTS: 'DE141',
            cumulatedInfected: parseInt(matches[2], 10),
            updateDate: moment.tz(matches[1], 'DD.MM.YYYY', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Reutlingen();