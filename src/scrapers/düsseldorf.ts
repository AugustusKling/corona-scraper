import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://corona.duesseldorf.de/news',
            /Mit Stand \w+, (?<updateDate>\d+\. \S+, \d+\.\d+) Uhr, wurde - seit dem 3\. März - bei insgesamt (?<cumulatedInfected>\d+) Düsseldorferinnen und Düsseldorfern eine Infektion mit dem Coronavirus diagnostiziert/
        );
        return {
            ...groups,
            NUTS: 'DEA11',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM, HH', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();