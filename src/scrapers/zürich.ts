import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://gd.zh.ch/internet/gesundheitsdirektion/de/themen/coronavirus.html',
            /<h2>Aktuelle Situation im Kanton Zürich \((?<updateDate>.+?) Uhr\)<\/h2>\s*<p>Zurzeit sind <strong>(?<cumulatedInfected>\d+)\s*<\/strong>\s*Personen mit Wohnsitz im Kanton Zürich positiv auf das Coronavirus getestet worden\.<\/p>\s*<p><strong>(?<currentlyHospitalized>\d+)<\/strong> positiv Getestete befinden sich in Spitalbehandlung[^]+?<\/p>\s*<p>Total <strong>(?<cumulatedDeaths>\d+)\s*<\/strong>\s*Todesfälle/
        );
        return {
            ...groups,
            NUTS: 'CH040',
            updateDate: moment.tz(groups.updateDate, 'D.M.YYYY, H.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();