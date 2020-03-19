import { Scraper } from '../scraper';
import fetch from 'node-fetch';

class Konstanz extends Scraper {
    public async get() {
        const response = await fetch('https://www.lrakn.de/,Lde/service-und-verwaltung/aemter/gesundheit+und+versorgung/coronavirus');
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseText = await response.text();
        const matches = responseText.match(/Aktuell gibt es im Landkreis Konstanz (\d+) bestätigte Fälle einer Coronavireninfektion./);
        if (matches) {
            return {
                scrapedAt: new Date().toISOString(),
                NUTS: 'DE138',
                cumulatedInfected: parseInt(matches[1], 10)
            };
        } else {
            throw new Error('Failed to extract.');
        }
    }
}

export const scraper = new Konstanz('Konstanz');