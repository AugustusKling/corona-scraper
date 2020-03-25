import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.ow.ch/de/verwaltung/dienstleistungen/?dienst_id=5962',
            /Bisher ist bei (?<cumulatedInfected>\d+) Personen im Kanton Obwalden das Coronavirus nachgewiesen worden \(Stand: (?<updateDate>.+?)\)/
        );
        return {
            NUTS: 'CH064',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected)
        };
    }
}

export const scraper = new ScraperImpl();