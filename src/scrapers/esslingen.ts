import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-esslingen.de/,Lde/16913644.html',
            /Lage (?<updateDate>\d\d\.\d\d\.\d\d\d\d)[^]+?Amtlich bestätigte Coronafälle<\/td>\s*<td>(?<cumulatedInfected>\d+)[^]+?Mit Corona infizierte Todesfälle<\/td>\s*<td>(?<cumulatedDeaths>\d+)[^]+?Genesene<\/td>\s*<td>(?<cumulatedRecovered>\d+)/
        );
        return {
            ...groups,
            NUTS: 'DE113',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
        };
    }
}

export const scraper = new ScraperImpl();