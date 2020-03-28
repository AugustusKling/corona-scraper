import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.muenchen.de/rathaus/Stadtinfos/Presse-Service/Presse-Archiv/2020/Coronavirus-Aktuelle-Entwicklung.html',
            /(?<updateDate>\d\d\. \S+ \(Stand \d\d\.\d\d) Uhr\), \d+ neue (?:Corona-)?Fälle bestätigt.+?in der Landeshauptstadt aktuell insgesamt (?<cumulatedInfected>\S+) Infektionen gemeldet/
        );
        return {
            ...groups,
            NUTS: 'DE212',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM [(Stand] HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();