import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landratsamt-unterallgaeu.de/buergerservice/gesundheit/coronavirus.html',
            /Im Unterallgäu gibt es(?: inzwischen)? (?<cumulatedInfected>\d+) (?:bestätigte )?Corona-Fälle[^]+?\(Stand: (?<updateDate>[^)]+?)\)/
        );
        return {
            ...groups,
            NUTS: 'DE27C',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();