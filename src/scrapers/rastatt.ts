import { Scraper } from '../scraper';

class Rastatt extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.baden-baden.de/stadtportrait/aktuelles/themen/coronavirus/',
            /Im Zust&auml;ndigkeitsbereich des Gesundheitsamtes in Rastatt, zu dem neben Baden-Baden auch der Landkreis Rastatt geh&ouml;rt, sind aktuell insgesamt (\d+) Personen mit dem Corona-Virus infiziert. Davon sind (\d+) F&auml;lle aus Baden-Baden./
        );
        const casesRastattAndBadenBaden = parseInt(matches[1], 10);
        const casesBadenBaden = parseInt(matches[2], 10);
        return {
            NUTS: 'DE124',
            cumulatedInfected: casesRastattAndBadenBaden - casesBadenBaden
        };
    }
}

export const scraper = new Rastatt();