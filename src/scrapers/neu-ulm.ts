import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://landkreis.neu-ulm.de/de/aktuelles-corona.html',
            /(?<cumulatedInfected>\d+) Personen im Landkreis  mit dem Coronavirus infiziert<\/a>\s*<\/h3>\s+<div class="gcarticle-list-teaser">\s*<p>Stand (?<updateDate>[^<]+) Uhr/
        );
        return {
            ...groups,
            NUTS: 'DE279',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString(),
        };
    }
}

export const scraper = new ScraperImpl();