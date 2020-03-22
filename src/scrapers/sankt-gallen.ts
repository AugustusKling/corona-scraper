import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.sg.ch/tools/informationen-coronavirus.html',
            /(\d\d\.\d\d\.\d\d\d\d):(?:<br\/>|\s)+Bestätigte Fälle: (\d+)/
        );
        return {
            NUTS: 'CH055',
            updateDate: moment.tz(matches[1], 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: parseInt(matches[2], 10)
        };
    }
}

export const scraper = new ScraperImpl();