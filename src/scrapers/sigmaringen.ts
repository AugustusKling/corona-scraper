import { Scraper } from '../scraper';

class Sigmaringen extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.landkreis-sigmaringen.de/de/Landratsamt/Kreisverwaltung/Fachbereiche/Gesundheit/Informationen-zum-neuartigen-Coronavirus',
            /labordiagnostisch bestätigte Infektionen:\s*(?:<em>)?(\d+)/
        );
        return {
            NUTS: 'DE149',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new Sigmaringen();