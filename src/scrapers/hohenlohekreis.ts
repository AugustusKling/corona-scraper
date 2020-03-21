import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Hohenlohekreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.corona-im-hok.de/',
            /Mit Stand (.+?) hat der Hohenlohekreis (\d+) bestätigte Coronafälle/
        );
        return {
            NUTS: 'DE119',
            cumulatedInfected: parseInt(matches[2], 10),
            updateDate: moment.tz(matches[1], 'DD.MM.YYYY', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Hohenlohekreis();