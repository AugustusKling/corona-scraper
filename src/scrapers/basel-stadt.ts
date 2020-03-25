import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.coronavirus.bs.ch/',
            /(?<updateDate>\d\d\.\d\d\.\d\d\d\d <span class="time">\(\d\d:\d\d\))[^]+?Tagesbulletin Coronavirus: (?<cumulatedInfected>\d+) bestätigte Fälle im Kanton Basel-Stadt/
        );
        return {
            NUTS: 'CH031',
            updateDate: moment.tz(groups.updateDate.replace(/<span class="time">/, ''), 'DD.MM.YYYY (HH:mm)', 'de', 'Europe/Berlin').toISOString(),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected)
        };
    }
}

export const scraper = new ScraperImpl();