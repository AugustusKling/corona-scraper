import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.biberach.de/index.php?id=40',
            /Im Landkreis Biberach gibt es \(Stand: (?<updateDate>.+?) Uhr\) insgesamt (?<cumulatedInfected>\d+) bestätigte Infektionen/
        );
        return {
            ...groups,
            NUTS: 'DE146',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM, HH', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();