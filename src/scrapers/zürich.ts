import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://gd.zh.ch/internet/gesundheitsdirektion/de/themen/coronavirus.html',
            /Aktuelle Situation im Kanton Zürich \((?<updateDate>.+?) Uhr\)[^]+?Im Kanton Zürich sind zurzeit (?<cumulatedInfected>\d+) Personen positiv auf das Coronavirus getestet worden. Total (?<cumulatedDeaths>\d+) Todesfälle/
        );
        return {
            NUTS: 'CH040',
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            updateDate: moment.tz(groups.updateDate, 'D.M.YYYY, H.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();