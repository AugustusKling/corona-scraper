import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Zollernalbkreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.zollernalbkreis.de/aktuelles/nachrichten/antworten+auf+haeufig+gestellte+fragen+zum+neuartigen+coronavirus',
            /Gesamtzahl der an dem Coronavirus-Infizierten im Zollernalbkreis: (?:<strong>)?(\d+).*\(Stand: (.+) Uhr\)/
        );
        return {
            NUTS: 'DE143',
            cumulatedInfected: parseInt(matches[1], 10),
            updateDate: moment.tz(matches[2], 'D.M.YYYY, H.m', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Zollernalbkreis();