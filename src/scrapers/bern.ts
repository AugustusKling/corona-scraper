import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.besondere-lage.sites.be.ch/besondere-lage_sites/de/index/corona/index.html',
            /<tr>\s*<td headers="th_top_5147_1A"><strong>(?<updateDate>\d\d\.\d\d\.\d\d<\/strong><br \/>\s*\d\d\.\d\d)\s*h<\/td>\s*<td headers="th_top_5147_2A">(?<cumulatedInfected>\d+)<\/td>\s*<td headers="th_top_5147_3A">(?<currentlyHospitalized>\d+)<\/td>\s*<td headers="th_top_5147_4A">\d+<\/td>\s*<td headers="th_top_5147_5A">(?<currentlyIntensiveCare>\d+)<\/td>\s*<td headers="th_top_5147_6A">\d+<\/td>\s*<td headers="th_top_5147_7A">(?<cumulatedDeaths>\d+)<\/td>\s*<\/tr>/
        );
        return {
            ...groups,
            NUTS: 'CH021',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YY[</strong><br /> HH.mm', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
        };
    }
}

export const scraper = new ScraperImpl();