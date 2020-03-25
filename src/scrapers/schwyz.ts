import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.sz.ch/behoerden/information-medien/medienmitteilungen/coronavirus.html/72-416-412-1379-6948',
            /Aktuelle Fallzahlen im Kanton Schwyz \(Stand: (?<updateDate>.+?)\): (?<cumulatedInfected>\d+) Infizierte, (?<cumulatedRecovered>\d+) Genesene/
        );
        return {
            NUTS: 'CH063',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedRecovered: this.parseNumber(groups.cumulatedRecovered)
        };
    }
}

export const scraper = new ScraperImpl();