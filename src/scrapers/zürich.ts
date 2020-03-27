import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://gd.zh.ch/internet/gesundheitsdirektion/de/themen/coronavirus.html',
            /<h2>Aktuelle Situation im Kanton Zürich \((?<updateDate>.+?) Uhr\)<\/h2>\s*<p>Im Kanton Zürich sind zurzeit (?<cumulatedInfected>\d+) Personen positiv auf das Coronavirus getestet worden\.<\/p>\s*<p>(?<currentlyHospitalized>\d+) positiv Getestete befinden sich in Spitalbehandlung, davon werden \d+ künstlich beatmet.<\/p>\s*<p>Total (?<cumulatedDeaths>\d+) Todesfälle/
        );
        return {
            ...groups,
            NUTS: 'CH040',
            updateDate: moment.tz(groups.updateDate, 'D.M.YYYY, H.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();