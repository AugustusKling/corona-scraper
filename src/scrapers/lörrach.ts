import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.loerrach-landkreis.de/de/Service-Verwaltung/Fachbereiche/Gesundheit/Sachgebiete/Sachgebiet/Corona?skipEntranceUrl',
            /Aktuelle Situation im Landkreis Lörrach \(Stand (.+?) Uhr\)[^]+Aktuell bestätigte COVID19-Fälle: (\d+)/
        );
        return {
            NUTS: 'DE139',
            cumulatedInfected: parseInt(matches[2], 10),
            updateDate: moment.tz(matches[1], 'DD. MMM YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();