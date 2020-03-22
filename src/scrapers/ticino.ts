import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www4.ti.ch/dss/dsp/covid19/home/',
            /(\d+)<\/p><p[^>]*>Casi positivi COVID-19<\/p><p[^>]*>(\d+)<\/p><p[^>]*>† Decessi/
        );
        return {
            NUTS: 'CH070',
            cumulatedInfected: parseInt(matches[1], 10),
            cumulatedDeaths: parseInt(matches[2], 10)
        };
    }
}

export const scraper = new ScraperImpl();