import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.ur.ch/themen/2962',
            /<caption>Stand: (?<updateDate>.+?) Uhr<\/caption>[^<]*<thead>[^<]*<tr>[^<]*<th[^>]*>Positiv getestete Erkrankungsfälle<\/th>[^<]*<th[^>]*>Hospitalisiert<\/th>[^<]*<th[^>]*>Verstorben<\/th>[^<]*<th[^>]*>Genesen<\/th>[^<]*<\/tr>[^<]*<\/thead>[^<]*<tbody>[^<]*<tr>[^<]*<td[^>]*>(?<cumulatedInfected>\d+)<\/td>[^<]*<td[^>]*>(?<cumulatedHospitalized>\d+)<\/td>[^<]*<td[^>]*>(?<cumulatedDeaths>\d+)<\/td>[^<]*<td[^>]*>(?<cumulatedRecovered>\d+)<\/td>/
        );
        return {
            NUTS: 'CH062',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH.mm', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedHospitalized: this.parseNumber(groups.cumulatedHospitalized),
            cumulatedDeaths: this.parseNumber(groups.cumulatedDeaths),
            cumulatedRecovered: this.parseNumber(groups.cumulatedRecovered),
        };
    }
}

export const scraper = new ScraperImpl();