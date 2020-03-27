import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Zollernalbkreis extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.zollernalbkreis.de/aktuelles/nachrichten/antworten+auf+haeufig+gestellte+fragen+zum+neuartigen+coronavirus',
            /Gesamtzahlen Zollernalbkreis \(Stand: (?<updateDate>[^)]+?) Uhr\):<br>Zahl der Coronavirus-Infizierten: <strong>(?<cumulatedInfected>\d+)<\/strong><br>Todesfälle in Zusammenhang mit COVID-19: <strong>(?<cumulatedDeaths>\d+)<\/strong><br>Bereits Genesene: <strong>(?<cumulatedRecovered>\d+)<\/strong>/
        );
        return {
            ...groups,
            NUTS: 'DE143',
            updateDate: moment.tz(groups.updateDate, 'D.M.YYYY, H:m', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Zollernalbkreis();