import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.traunstein.com/aktuelles',
            /<div class="field presse_datum">(?<updateDate>\d\d\.\d\d.\d\d\d\d).+?Aktuelle Informationen zum Corona-Virus im LK TS - insgesamt (?<cumulatedInfected>\d+) bestätigte Corona-Fälle/
        );
        return {
            NUTS: 'DE21M',
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();