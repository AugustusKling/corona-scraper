import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.ow.ch/de/verwaltung/dienstleistungen/?dienst_id=5962',
            /Bisher ist bei (?<cumulatedInfected>\d+) Personen im Kanton Obwalden das Coronavirus nachgewiesen worden. Bereits genesene Personen sind in dieser Zahl ebenfalls enthalten \(Stand: (?<updateDate>.{10,40}?)\)/
        );
        return {
            ...groups,
            NUTS: 'CH064',
            updateDate: moment.tz(groups.updateDate.replace(/M�rz/, 'März'), 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
        };
    }
}

export const scraper = new ScraperImpl();