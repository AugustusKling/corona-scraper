import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://lra-aic-fdb.de/landratsamt/fachbereiche/abteilung-3-oeffentliche-sicherheit/gesundheitsamt/informationen-zum-coronavirus',
            /\w+, (?<updateDate>\d\d\.\d\d\.\d\d\d\d)[^]+?Aktuell\s+(?<cumulatedInfected>\d+)\s+Infektionsfälle/
        );
        return {
            ...groups,
            NUTS: 'DE275',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();