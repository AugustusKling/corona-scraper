import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lra-toelz.de/coronavirus',
            /Im Landkreis werden heute Nachmittag, \w+, (?<updateDate>\d\d\. \S+ \d\d\d\d) insgesamt (?<cumulatedInfected>\d+) mit Covid-19 infizierte Personen gezählt/
        );
        return {
            ...groups,
            NUTS: 'DE216',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();