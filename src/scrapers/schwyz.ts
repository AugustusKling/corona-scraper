import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.sz.ch/behoerden/information-medien/medienmitteilungen/coronavirus.html/72-416-412-1379-6948',
            /Coronafälle im Kanton Schwyz \(Stand: (?<updateDate>.+?)\): (?<cumulatedInfected>\d+) bestätigte Fälle, (?<cumulatedDeaths>\d+) Verstorbene, (?<cumulatedRecovered>\d+) Genesene/
        );
        return {
            ...groups,
            NUTS: 'CH063',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();