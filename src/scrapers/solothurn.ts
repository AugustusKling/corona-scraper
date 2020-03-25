import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://corona.so.ch/',
            /Situation Kanton Solothurn \(Stand (?<updateDate>\d\d\.\d\d\.\d\d\d\d, \d+:\d+) Uhr\).+Anzahl positiv getesteter Erkrankungsfälle: (?<cumulatedInfected>\d+)/
        );
        return {
            NUTS: 'CH023',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString(),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected)
        };
    }
}

export const scraper = new ScraperImpl();