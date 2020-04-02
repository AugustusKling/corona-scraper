import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.augsburg.de/umwelt-soziales/gesundheit/coronavirus/fallzahlen',
            /Fallzahlen \(Stand\s+(?<updateDate>[^)]+?)\s*\)[^]+?Bestätigte Fälle:\s*(?<cumulatedInfected>\d+)[^]+?Davon genesen:\s*(?<cumulatedRecovered>\d+)[^]+?Davon verstorben:\s*(?<cumulatedDeaths>\d+)/,
        );
        return {
            ...groups,
            NUTS: 'DE271',
            updateDate: moment.tz(groups.updateDate, 'D. MMM, H:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();