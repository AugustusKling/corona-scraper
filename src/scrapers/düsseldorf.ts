import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.duesseldorf.de/aktuelles/news/',
            /Mit Stand \w+, (?<updateDate>\d+\. \S+, \d+) Uhr, gibt es insgesamt (?<cumulatedInfected>\d+) Düsseldorferinnen und Düsseldorfer, bei denen eine Infektion mit dem Coronavirus diagnostiziert wurde/
        );
        return {
            ...groups,
            NUTS: 'DEA11',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM, HH', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();