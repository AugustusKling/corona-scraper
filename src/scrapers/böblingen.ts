import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lrabb.de/start/Aktuelles/coronavirus.html',
            /(?<cumulatedInfected>\d+) Erkrankte<br>(?<cumulatedDeaths>\d+) Todesfälle<br>(?<cumulatedRecovered>\d+) geheilte Personen<br>\(Stand: (?<updateDate>[^)]+)\)/
        );
        return {
            ...groups,
            NUTS: 'DE112',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();