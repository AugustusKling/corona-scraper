import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www4.ti.ch/dss/dsp/covid19/home/',
            />([\d']+)<\/p><p[^>]*>Casi positivi COVID-19<\/p><p[^>]*>([\d']+)<\/p><p[^>]*>† Decessi/
        );
        return {
            NUTS: 'CH070',
            cumulatedInfected: this.parseNumber(matches[1]),
            cumulatedDeaths: this.parseNumber(matches[2])
        };
    }
}

export const scraper = new ScraperImpl();