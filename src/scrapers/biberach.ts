import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.biberach.de/index.php?id=40',
            /(?:Im Landkreis Biberach gibt es \(Stand: (?<updateDate1>.+?) Uhr\) insgesamt (?<cumulatedInfected1>\d+) bestätigte Infektionen)|(?:Stand \w+, (?<updateDate2>.+?) Uhr, insgesamt (?<cumulatedInfected2>\d+) positiv bestätigte Coronafälle)/
        );
        return {
            NUTS: 'DE146',
            updateDate: moment.tz(groups.updateDate1 || groups.updateDate2, 'DD. MMM, HH', 'de', 'Europe/Berlin').toISOString(),
            cumulatedInfected: groups.cumulatedInfected1 || groups.cumulatedInfected2
        };
    }
}

export const scraper = new ScraperImpl();