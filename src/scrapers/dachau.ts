import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landratsamt-dachau.de/gesundheit-veterinaerwesen-sicherheitsrecht/gesundheit/coronavirus/',
            /-(?<cumulatedInfected>\d+)-index-faelle-im-landkreis-stand-(?<updateDate>\d{8}-\d{4})-uhr\//
        );
        return {
            ...groups,
            NUTS: 'DE217',
            updateDate: moment.tz(groups.updateDate, 'DDMMYYYY-HHmm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();