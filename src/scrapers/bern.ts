import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.besondere-lage.sites.be.ch/besondere-lage_sites/de/index/corona/index.html',
            /<td headers="th_top_5147_1A"><strong>(?<cumulatedInfected>\d+)<\/strong><\/td>[^]*<td headers="th_top_5147_2A">(?<cumulatedDeaths>\d+)<\/td>[^]+\(Stand: (?<updateDate>.+?)\)/
        );
        return {
            NUTS: 'CH021',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedDeaths: this.parseNumber(groups.cumulatedDeaths)
        };
    }
}

export const scraper = new ScraperImpl();