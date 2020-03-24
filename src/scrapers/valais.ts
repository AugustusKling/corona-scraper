import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.vs.ch/de/web/coronavirus/info',
            />(?<updateDate>\d\d\.\d\d.\d\d\d\d): Derzeit gibt es (?<cumulatedInfected>\d+) bestätigte Fälle von Coronavirus-Infektionen im Kanton. Insgesamt hat das Virus bisher den Tod von (?<cumulatedDeaths>\d+) Personen im Wallis verursacht/
        );
        return {
            NUTS: 'CH012',
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedDeaths: this.parseNumber(groups.cumulatedDeaths),
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();