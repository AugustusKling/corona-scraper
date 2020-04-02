import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://gesundheit.lu.ch/themen/Humanmedizin/Infektionskrankheiten/Coronavirus',
            /Aktuelle Fallzahlen im Kanton Luzern\s*<\/strong>\(Stand: (?<updateDate>[^)]+) Uhr\)[^]*<tr(?:[^](?!<\/tr>))+Bestätigte Fälle:(?:[^](?!<\/tr>))+>(?<cumulatedInfected>\d+)<\/p>[^]*<tr(?:[^](?!<\/tr>))+Hospitalisiert:(?:[^](?!<\/tr>))+>(?<currentlyHospitalized>\d+)<\/p>[^]*<tr(?:[^](?!<\/tr>))+Intensivpflege:(?:[^](?!<\/tr>))+>(?<currentlyIntensiveCare>\d+)<\/p>[^]*<tr(?:[^](?!<\/tr>))+Todesfälle:(?:[^](?!<\/tr>))+>(?<cumulatedDeaths>\d+)<\/p>/
        );
        return {
            ...groups,
            NUTS: 'CH061',
            updateDate: moment.tz(groups.updateDate, 'D. MMM YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();