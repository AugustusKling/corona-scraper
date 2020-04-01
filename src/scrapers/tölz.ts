import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lra-toelz.de/coronavirus',
            />[^\d<]*(?:(?<cumulatedInfected1>\d+)[^<]*infiziert|infiziert[^\d<]*(?<cumulatedInfected2>\d+))[^<]*<span class="related__download_size">[^<]*<\/span><\/a><p>[^<]*(?<updateDate>\d\d\. \S+ \d\d\d\d)/i
        );
        return {
            NUTS: 'DE216',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: groups.cumulatedInfected1 || groups.cumulatedInfected2
        };
    }
}

export const scraper = new ScraperImpl();