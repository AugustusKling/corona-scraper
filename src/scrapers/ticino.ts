import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www4.ti.ch/dss/dsp/covid19/home/',
            />(?<cumulatedInfected>[\d']+)<\/p><p[^>]*>Casi positivi COVID-19<\/p><p[^>]*>(?<cumulatedDeaths>[\d']+)<\/p><p[^>]*>Decessi<\/p>.+Stato complessivo al:<br \/><b>(?<updateDate>[^<]+?)</
        );
        return {
            ...groups,
            NUTS: 'CH070',
            updateDate: moment.tz(groups.updateDate, 'DD MMM YYYY[, ore ]H.mm', 'it', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();