import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.augsburg.de/umwelt-soziales/gesundheit/coronavirus',
            /In Augsburg wurden bisher\s*<strong>\s*(?<cumulatedInfected>\d+) COVID-19-Fälle<\/strong> bestätigt \(Stand (?<updateDate>[^)]+) Uhr\).?<\/p>[^]+?(?<cumulatedRecovered>\d+) Personen sind genesen<\/strong>/
        );
        return {
            ...groups,
            NUTS: 'DE271',
            updateDate: moment.tz(groups.updateDate, 'D.M.YYYY, H:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();