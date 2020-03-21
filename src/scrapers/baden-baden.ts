import { Scraper } from '../scraper';

class BadenBaden extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.baden-baden.de/stadtportrait/aktuelles/themen/coronavirus/',
            /Im Zust&auml;ndigkeitsbereich des Gesundheitsamtes in Rastatt, zu dem neben Baden-Baden auch der Landkreis Rastatt geh&ouml;rt, sind aktuell insgesamt \d+ Personen mit dem Corona-Virus infiziert. Davon sind (\d+) F&auml;lle aus Baden-Baden./
        );
        return {
            NUTS: 'DE121',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new BadenBaden();