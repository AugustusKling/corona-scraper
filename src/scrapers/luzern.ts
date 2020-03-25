import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://gesundheit.lu.ch/themen/Humanmedizin/Infektionskrankheiten/Coronavirus',
            /Im Kanton Luzern gibt es (?<cumulatedInfected>\d+) bestätige Fälle \(Stand: (?<updateDate>.+?) Uhr\)/
        );
        return {
            NUTS: 'CH061',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString(),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected)
        };
    }
}

export const scraper = new ScraperImpl();