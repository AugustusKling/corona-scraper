import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landratsamt-dachau.de/gesundheit-veterinaerwesen-sicherheitsrecht/gesundheit/coronavirus/',
            /Landkreis-Statistik für den (?<updateDate>\d\d\.\d\d\.\d\d\d\d)[^]+?<td[^>]*><strong>Gesamt<\/strong><\/td>\s*<td[^>]*><strong>(?<cumulatedInfected>\d+)<\/strong><\/td>\s*<td[^>]*><strong>(?<cumulatedRecovered>\d+)<\/strong><\/td>\s*<td[^>]*><strong>(?<currentlyQuarantained>\d+)<\/strong><\/td>/
        );
        return {
            ...groups,
            NUTS: 'DE217',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();