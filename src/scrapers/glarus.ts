import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.gl.ch/verwaltung/finanzen-und-gesundheit/gesundheit/coronavirus.html/4817',
            /Update Kanton Glarus.+?\(Stand: (?<updateDate>.+?) Uhr\)[^]*Bestätigte Fälle: <strong>\s*(?<cumulatedInfected>\d+)\s*<\/strong>.+?Personen in Spitalpflege: <strong>\s*(?<cumulatedHospitalized>\d+)\s*<\/strong>.+?Verstorbene Personen: <strong>(?<cumulatedDeaths>\d+)\s*<\/strong>/
        );
        return {
            NUTS: 'CH051',
            updateDate: moment.tz(groups.updateDate, 'D.M.YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString(),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedHospitalized: this.parseNumber(groups.cumulatedHospitalized)
        };
    }
}

export const scraper = new ScraperImpl();