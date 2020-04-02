import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.nw.ch/gesundheitsamtdienste/6044',
            /Stand: (?<updateDate>.{5,40}) Uhr[^]+Positiv getestete Personen:\s*<strong>\s*(?<cumulatedInfected>\d+)[^]+?verstorbene Personen:\s*<strong>\s*(?<cumulatedDeaths>\d+)/i
        );
        return {
            ...groups,
            NUTS: 'CH065',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY, HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();