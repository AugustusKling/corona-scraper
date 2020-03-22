import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.oberallgaeu.org/de/news/detail/corona:-newsticker-oberallgaeu.html',
            /\+\+(.+?)\+\+\s*(\d+)(?:&nbsp;|\s)*F&auml;lle(?:&nbsp;|\s)*von Corona-Virus-Infektionen einschl.+(\d+)(?:&nbsp;|\s)*Todes/
        );
        return {
            NUTS: 'DE27E',
            updateDate: moment.tz(matches[1], 'DD.MM.YYYY', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: parseInt(matches[2], 10),
            cumulatedDeaths: parseInt(matches[3], 10)
        };
    }
}

export const scraper = new ScraperImpl();