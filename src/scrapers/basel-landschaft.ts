import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.statistik.bl.ch/files/sites/Grafiken/COVID19/Grafik_COVID19_BL_Linie.htm',
            /<pre id="data" style="display:none;">[^]*(?<updateDate>\d\d\-\d\d\-\d\d\d\d),(?<cumulatedInfected>\d+),(?<cumulatedDeaths>\d+)\s*<\/pre>/
        );
        return {
            NUTS: 'CH032',
            updateDate: moment.tz(groups.updateDate, 'DD-MM-YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            cumulatedDeaths: this.parseNumber(groups.cumulatedDeaths)
        };
    }
}

export const scraper = new ScraperImpl();