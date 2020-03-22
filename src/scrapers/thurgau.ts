import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.tg.ch/news/fachdossier-coronavirus.html/10552',
            /Anzahl bestätigter Fälle: (\d+)<\/li>[^]*?<\/ul>[^]*?<p><em>Stand ([^<]+)</
        );
        return {
            NUTS: 'CH057',
            cumulatedInfected: parseInt(matches[1], 10),
            updateDate: moment.tz(matches[2], 'D.M.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
        };
    }
}

export const scraper = new ScraperImpl();