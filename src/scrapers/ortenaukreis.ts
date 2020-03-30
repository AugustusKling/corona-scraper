import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.ortenaukreis.de/corona',
            /<div class="date">(?<updateDate>[^<]+)<\/div>(?:[^](?!<div class="date">))+[>\s](?<cumulatedInfected>\d+) bestätigte Covid-19-Fälle im Ortenaukreis/
        );
        return {
            ...groups,
            NUTS: 'DE134',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();