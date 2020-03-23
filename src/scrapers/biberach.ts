import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.biberach.de/index.php?id=40',
            /Was gibt es Neues\? \(Stand (.+) Uhr\)[^]+?(\d+)\s+bestätigte Fälle im Landkreis Biberach/
        );
        return {
            NUTS: 'DE146',
            cumulatedInfected: parseInt(matches[2], 10),
            updateDate: moment.tz(matches[1], 'DD. MMM YYYY, HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();