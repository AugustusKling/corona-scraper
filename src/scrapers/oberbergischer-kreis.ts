import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'http://www.oberbergischer-kreis.de/cms200/aktuelles/sars/presse/',
            /(?<updateDate>\d\d\.\d\d\.\d\d\d\d): Coronavirus: Insgesamt (?<cumulatedInfected>\d+) bestätigte Fälle/
        );
        return {
            ...groups,
            NUTS: 'DEA2A',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();