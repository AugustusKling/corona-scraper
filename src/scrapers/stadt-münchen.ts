import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.muenchen.de/rathaus/Stadtinfos/Coronavirus-Fallzahlen.html',
            /(?<updateDate>\d{1,2}\. \S+ \d{4} \(Stand: \d{1,2}[.:]\d\d) Uhr\)[^]+?in der Landeshauptstadt aktuell insgesamt (?<cumulatedInfected>\S+) Infektionen gemeldet[^]+?(?<cumulatedRecovered>\S+) Personen, die bereits geheilt sind/
        );
        return {
            ...groups,
            NUTS: 'DE212',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM [(Stand:] HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();