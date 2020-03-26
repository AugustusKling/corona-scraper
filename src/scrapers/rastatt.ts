import { Scraper, parseNumber } from '../scraper';
import * as moment from 'moment-timezone';

class Rastatt extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.baden-baden.de/stadtportrait/aktuelles/themen/coronavirus/corona-aktuell/',
            /In Baden-Baden sind inzwischen (?<cumulatedInfectedBadenBaden>\d+) Personen infiziert, im Landkreis Rastatt (?<cumulatedInfectedRastatt>\d+) Personen. Zusammen sind das \d+ Personen im Zuständigkeitsbereich des Gesundheitsamts Rastatt. Insgesamt sind \w+ Corona-Patienten genesen und aus der Quarantäne entlassen. \d+ aktive COVID-19-Fälle befinden sich in Quarantäne. \(Stand (?<updateDate>.{1,40}) Uhr\)/
        );
        
        const updateDate = moment.tz(groups.updateDate, 'DD. MMM, HH', 'de', 'Europe/Berlin').toISOString();
        return [
            {
                // Baden-Baden
                NUTS: 'DE121',
                cumulatedInfected: parseNumber(groups.cumulatedInfectedBadenBaden),
                updateDate
            },
            {
                // Rastatt
                NUTS: 'DE124',
                cumulatedInfected: parseNumber(groups.cumulatedInfectedRastatt),
                updateDate
            }
        ];
    }
}

export const scraper = new Rastatt();