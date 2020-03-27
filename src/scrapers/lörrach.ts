import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.loerrach-landkreis.de/de/Service-Verwaltung/Fachbereiche/Gesundheit/Sachgebiete/Sachgebiet/Corona?skipEntranceUrl',
            /Aktuelle Situation im Landkreis Lörrach \(Stand (?<updateDate>.{5,40}?) Uhr\)[^]+Aktuell bestätigte COVID19-Fälle: (?<cumulatedInfected>\d+)[^]+Verstorbene Menschen mit COVID-19-Infektion: (?<cumulatedDeaths>\d+)/
        );
        return {
            ...groups,
            NUTS: 'DE139',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY, HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();