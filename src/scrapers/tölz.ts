import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lra-toelz.de/pressemitteilungen',
            /<li>Pressemitteilung: (?<updateDate>\d\d\.\d\d\.\d\d\d\d)<\/li>(?:[^](?!<\/a>))+>(?:(?<cumulatedInfected1>\d+) infizierte Personen[^<]+|Zahl der Infizierten steigt auf (?<cumulatedInfected2>\d+).+?|(?<cumulatedInfected3>\d+) mit dem Coronavirus Infizierte.+?)<\/a>/
        );
        return {
            NUTS: 'DE216',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: groups.cumulatedInfected1 || groups.cumulatedInfected2 || groups.cumulatedInfected3
        };
    }
}

export const scraper = new ScraperImpl();