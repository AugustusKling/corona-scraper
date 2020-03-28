import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-freudenstadt.de/Startseite/Aktuell/aktuelle+situation+im+landkreis+freudenstadt.html',
            /Die Zahl der mit dem Coronavirus positiv getesteten Personen im Landkreis Freudenstadt ist am \w+ \((?<updateDate>[^)]+)\) auf (?<cumulatedInfected>\d+) gestiegen/
        );
        return {
            ...groups,
            NUTS: 'DE12C',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();