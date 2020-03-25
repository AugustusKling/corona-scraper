import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.zg.ch/behoerden/gesundheitsdirektion/amt-fuer-gesundheit/corona',
            /Infizierte Personen: (?<cumulatedInfected>\d+)[^]+Genesene Personen: (?<cumulatedRecovered>\d+)[^]+Verstorbene Personen: (?<cumulatedDeaths>\d+)[^]+Stand: (?<updateDate>.+?) Uhr/
        );
        return {
            NUTS: 'CH066',
            updateDate: moment.tz(groups.updateDate, 'D.M.YYYY, H:mm', 'de', 'Europe/Berlin').toISOString(),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedRecovered: this.parseNumber(groups.cumulatedRecovered),
            cumulatedDeaths: this.parseNumber(groups.cumulatedDeaths),
        };
    }
}

export const scraper = new ScraperImpl();