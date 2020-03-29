import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.solingen.de/de/inhalt/coronavirus/',
            /Stand (?<updateDate>[^<]+<)[^]+?Aktuell gibt es in Solingen (?<cumulatedInfected>\d+) bestätigte Fälle von Infektionen mit dem Coronavirus/
        );
        return {
            ...groups,
            NUTS: 'DEA19',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY[ - ]HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();