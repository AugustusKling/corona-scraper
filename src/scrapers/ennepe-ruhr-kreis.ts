import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.enkreis.de/gesundheitsoziales/gesundheit/faq-corona.html',
            /<tr><td>(?<updateDate>\d+\. \w+)<\/td><td>\s*<\/td><td><a[^>]*>(?<cumulatedInfected>\d+)(?: bestätigte)? Fälle, (?:davon )?(?<cumulatedRecovered>\d+)(?: davon)? (?:gesundet|Gesundete), (?<currentlyHospitalized>\d+) stationär\s*<\/a><\/td><\/tr>/
        );
        return {
            ...groups,
            NUTS: 'DEA56',
            updateDate: moment.tz(groups.updateDate, 'D. MMM', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();