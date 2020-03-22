import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.landratsamt-unterallgaeu.de/buergerservice/gesundheit/coronavirus.html',
            /Im Unterallgäu gibt es (\d+) Corona-Fälle \(Stand: (.+?) Uhr\)/
        );
        return {
            NUTS: 'DE27C',
            cumulatedInfected: parseInt(matches[1], 10),
            updateDate: moment.tz(matches[2], 'DD. MMM, HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();