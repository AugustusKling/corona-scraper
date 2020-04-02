import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-muenchen.de/themen/verbraucherschutz-gesundheit/gesundheit/coronavirus/fallzahlen/',
            /insgesamt <strong>(?<cumulatedInfected>\d+) bestätigte Infektionsfälle<\/strong> \(Stand: (?<updateDate>.{10,40}) Uhr\)[^]+?insgesamt <strong>(?<cumulatedDeaths>\d+) Todesfälle<\/strong> bestätigt[^]+?Insgesamt gelten <strong>(?<cumulatedRecovered>\d+) Personen <\/strong>als statistisch<strong> genesen/
        );
        return {
            ...groups,
            NUTS: 'DE21H',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();