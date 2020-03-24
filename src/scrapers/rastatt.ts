import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Rastatt extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.baden-baden.de/stadtportrait/aktuelles/themen/coronavirus/corona-aktuell/',
            /In Baden-Baden haben sich inzwischen (\d+) Personen mit dem Virus infiziert, im Landkreis Rastatt (\d+) Personen.+?\(Stand (.+?) Uhr\)/
        );
        
        const updateDate = moment.tz(matches[3], 'DD. MMM, HH', 'de', 'Europe/Berlin').toISOString()
        return [
            {
                // Baden-Baden
                NUTS: 'DE121',
                cumulatedInfected: parseInt(matches[1], 10),
                updateDate
            },
            {
                // Rastatt
                NUTS: 'DE124',
                cumulatedInfected: parseInt(matches[2], 10),
                updateDate
            }
        ];
    }
}

export const scraper = new Rastatt();