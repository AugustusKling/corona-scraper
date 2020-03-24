import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.ar.ch/verwaltung/departement-gesundheit-und-soziales/amt-fuer-gesundheit/informationsseite-coronavirus/',
            /Appenzell Ausserrhoden hat mit\s+Stand (?<updateDate>.+?)h:[^]*<li>(?<cumulatedInfected>\d+) bestätigte Fälle[^]*<li>(?<cumulatedHospitalized>\d+) Personen hospitalisiert[^]*<li>(?<cumulatedDeaths>\d+) Personen verstorben/
        );
        return {
            NUTS: 'CH053',
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedHospitalized: this.parseNumber(groups.cumulatedHospitalized),
            cumulatedDeaths: this.parseNumber(groups.cumulatedDeaths),
            updateDate: moment.tz(groups.updateDate, 'D.M. / H', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();