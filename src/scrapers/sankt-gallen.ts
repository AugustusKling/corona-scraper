import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.sg.ch/tools/informationen-coronavirus.html',
            /(?<updateDate>\d\d\.\d\d\.\d\d\d\d):<\/p><p>Bestätigte Fälle: (?<cumulatedInfected>\d+)<br\/>Todesfälle: (?<cumulatedDeaths>\d+)/
        );
        return {
            NUTS: 'CH055',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedDeaths: this.parseNumber(groups.cumulatedDeaths)
        };
    }
}

export const scraper = new ScraperImpl();