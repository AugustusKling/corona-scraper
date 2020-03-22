import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.tirol.at/informationen-coronavirus',
            /In Tirol sind nach offiziellen Angaben des Landes mit Stand (.+?:\d\d) (\d+) Corona-Infektionen bestätigt. (\d+) Personen sind vollständig genesen./
        );
        return {
            NUTS: 'AT33',
            updateDate: moment.tz(matches[1], 'DD. MMM YYYY, HH:mm', 'Europe/Berlin').toISOString(),
            cumulatedInfected: parseInt(matches[2], 10),
            cumulatedRecovered: parseInt(matches[3], 10),
        };
    }
}

export const scraper = new ScraperImpl();