import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Hohenlohekreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.corona-im-hok.de/',
            /Insgesamt sind damit (\d+) Coronavirus-Fälle im Hohenlohekreis nachgewiesen \(Stand (.+) Uhr\)/
        );
        return {
            NUTS: 'DE119',
            cumulatedInfected: parseInt(matches[1], 10),
            updateDate: moment.tz(matches[2], 'DD.MM.YYYY, HH', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Hohenlohekreis();