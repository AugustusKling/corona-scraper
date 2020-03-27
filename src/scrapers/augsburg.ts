import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-augsburg.de/soziales-gesundheit/staatliches-gesundheitsamt/coronavirus/',
            /\+\+\+ UPDATE, \w+, (?<updateDate>[^+]+?) \+\+\+<\/strong><\/p><p>Aktuell (?<cumulatedInfected>\d+) bestätigte Fälle des Coronavirus im Landkreis Augsburg\./
        );
        return {
            ...groups,
            NUTS: 'DE276',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();