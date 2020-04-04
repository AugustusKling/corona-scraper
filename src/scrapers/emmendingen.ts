import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-emmendingen.de/aktuelles/coronavirus/',
            /(?<updateDate>\d+\. \w+ \d\d\d\d)<\/b>\s*<\/p>\s*<p><b>Neue Fälle:<\/b>\s*\d+<\/p>\s*<p><b>Fälle gesamt:<\/b>\s*(?<cumulatedInfected>\d+)\s*<\/p>\s*<p><b>Todesfälle:<\/b>\s*(?<cumulatedDeaths>\d+)/
        );
        return {
            ...groups,
            NUTS: 'DE133',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
        };
    }
}

export const scraper = new ScraperImpl();