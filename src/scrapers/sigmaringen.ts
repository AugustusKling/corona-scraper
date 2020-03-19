import { Scraper } from '../scraper';
import fetch from 'node-fetch';

class Sigmaringen extends Scraper {
    public async get() {
        const response = await fetch('https://www.landkreis-sigmaringen.de/de/Landratsamt/Kreisverwaltung/Fachbereiche/Gesundheit/Informationen-zum-neuartigen-Coronavirus');
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseText = await response.text();
        const matches = responseText.match(/labordiagnostisch bestätigte Infektionen: <em>(\d+) Personen<\/em>/);
        if (matches) {
            return {
                scrapedAt: new Date().toISOString(),
                NUTS: 'DE149',
                cumulatedInfected: parseInt(matches[1], 10)
            };
        } else {
            throw new Error('Failed to extract.');
        }
    }
}

export const scraper = new Sigmaringen('sigmaringen');