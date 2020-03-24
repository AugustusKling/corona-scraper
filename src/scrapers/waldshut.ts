import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.landkreis-waldshut.de/aktuelles/informationen-zum-neuartigen-coronavirus/',
            /(\d+) gemeldete Coronavirusfälle im Landkreis \(Stand \w+, (.+?) Uhr\)/
        );
        return {
            NUTS: 'DE13A',
            cumulatedInfected: parseInt(matches[1], 10),
            updateDate: moment.tz(matches[2], 'DD.MM.YYYY, HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();