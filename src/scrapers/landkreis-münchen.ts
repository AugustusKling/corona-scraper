import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-muenchen.de/themen/verbraucherschutz-gesundheit/gesundheit/fallzahlen-nach-gemeinden/',
            /im Landkreis München aktuell (?<cumulatedInfected>\d+) bestätigte Erkrankungsfälle \(Stand: (?<updateDate>.{10,40}) Uhr\)/
        );
        return {
            ...groups,
            NUTS: 'DE21H',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();