import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.kreis-tuebingen.de/corona.html',
            /Aktuelle Fallzahlen: (?<cumulatedInfected>\d+) \(\s*Stand (?<updateDate>\d+\.\d+\.\d\d\d\d)\)/
        );
        return {
            ...groups,
            NUTS: 'DE142',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
        };
    }
}

export const scraper = new ScraperImpl();