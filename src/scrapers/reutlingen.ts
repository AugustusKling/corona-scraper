import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Reutlingen extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.kreis-reutlingen.de/de/Aktuelles/Landkreis-aktuell/Landkreis-aktuell?view=publish&item=article&id=1923&skipEntranceUrl',
            /Stand: (?<updateDate>\d\d[.]\d\d[.]\d\d\d\d)[^]+Gesamtzahl laborbestätigter Fälle: (?<cumulatedInfected>\d+)[^]+Gesamtzahl Todesfälle: (?<deaths>\d+)/
        );
        return {
            NUTS: 'DE141',
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedDeaths: this.parseNumber(groups.deaths),
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Reutlingen();