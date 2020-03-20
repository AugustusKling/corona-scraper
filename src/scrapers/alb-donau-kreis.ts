import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class AlbDonauKreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.alb-donau-kreis.de/alb-donau-kreis/startseite/dienstleistungen+service/coronavirus.html',
            /Zahl der bestätigten Fälle im Alb-Donau-Kreis und Stadtkreis Ulm[^]+Stand: (.+) Uhr[^]+Alb-Donau-Kreis \(rund (.+?) Einwohner\): (\d+) Fälle/
        );
        return {
            NUTS: 'DE145',
            cumulatedInfected: parseInt(matches[3], 10),
            updateDate: moment.tz(matches[1], 'DD.MM.YYYY, HH:mm', 'Europe/Berlin').toISOString(),
            population: parseInt(matches[2].replace(/[.]/, ''), 10)
        };
    }
}

export const scraper = new AlbDonauKreis();