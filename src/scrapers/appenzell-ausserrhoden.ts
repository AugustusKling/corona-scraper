import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.ar.ch/verwaltung/departement-gesundheit-und-soziales/amt-fuer-gesundheit/informationsseite-coronavirus/',
            /Fälle \(Stand: (?<updateDate>.+?) Uhr\)<\/h3><ul><li>laborbestätigte Fälle:\s*<strong>(?<cumulatedInfected>\d+)\s*<\/strong>Personen<\/li>\s*<li>Todesfälle:\s*<strong>(?<cumulatedDeaths>\d+)/i
        );
        return {
            ...groups,
            NUTS: 'CH053',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();