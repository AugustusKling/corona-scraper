import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.gr.ch/DE/institutionen/verwaltung/djsg/ga/coronavirus/info/Seiten/Start.aspx',
            /Fallzahlen\s+(.+?)<[^]+?Best&auml;tigte F&auml;lle: (\d+)[^]+?Personen in Spitalpflege: (\d+)[^]+?Verstorbene Personen: (\d+)/
        );
        return {
            NUTS: 'CH056',
            updateDate: moment.tz(matches[1], 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: parseInt(matches[2], 10),
            currentlyHospitalized: parseInt(matches[3], 10),
            cumulatedDeaths: parseInt(matches[4], 10)
        };
    }
}

export const scraper = new ScraperImpl();