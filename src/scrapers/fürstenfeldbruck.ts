import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lra-ffb.de/amt-service/veroeffentlichungen/pressemitteilungen/',
            /Mit Stand (?<updateDate>\d+\.\d+\.\d\d\d\d) gibt es insgesamt (?<cumulatedInfected>\d+) Corona Infizierte mit Wohnsitz im Landkreis Fürstenfeldbruck./
        );
        return {
            ...groups,
            NUTS: 'DE21C',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();