import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Heidenheim extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.info-corona-lrahdh.de/startseite',
            /Es gibt aktuell (\d+) bestätigte Coronavirus-Infektionen im Landkreis Heidenheim/
        );
        return {
            NUTS: 'DE11C',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new Heidenheim();