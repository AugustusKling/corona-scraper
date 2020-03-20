import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class StadtkreisUlm extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.alb-donau-kreis.de/alb-donau-kreis/startseite/dienstleistungen+service/coronavirus.html',
            /Zahl der bestätigten Fälle im Alb-Donau-Kreis und Stadtkreis Ulm[^]+Stand: (.+) Uhr[^]+Stadtkreis Ulm \(rund (.+) Einwohner\): (\d+) Fälle/
        );
        return {
            NUTS: 'DE144',
            cumulatedInfected: parseInt(matches[3], 10),
            updateDate: moment.tz(matches[1], 'DD.MM.YYYY, HH:mm', 'Europe/Berlin').toISOString(),
            population: parseInt(matches[2].replace(/[.]/, ''), 10)
        };
    }
}

export const scraper = new StadtkreisUlm();