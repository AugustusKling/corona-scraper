import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.sonderlage-kreis-mettmann.de/Pressemitteilungen',
            /<div class="date">(?<updateDate>[^<]+?)<[^]+?(?<cumulatedInfected>\d+) Erkrankte/
        );
        return {
            ...groups,
            NUTS: 'DEA1C',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();