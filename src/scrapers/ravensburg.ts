import { Scraper } from '../scraper';
import fetch from 'node-fetch';

class Ravensburg extends Scraper {
    public async get() {
        const response = await fetch('https://www.rv.de/Startseite');
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseText = await response.text();
        const matches = responseText.match(/Derzeit gibt es bei uns (\d+) bekannte\s+Coronavirus-Infektionsf&auml;lle.<br>\s+Unter diesen best&auml;tigten\s+F&auml;llen sind (\d+) Personen wieder als gesund\s+diagnostiziert./);
        if (matches) {
            return {
                scrapedAt: new Date().toISOString(),
                NUTS: 'DE148',
                cumulatedInfected: parseInt(matches[1], 10),
                cumulatedRecoved: parseInt(matches[2], 10)
            };
        } else {
            throw new Error('Failed to extract.');
        }
    }
}

export const scraper = new Ravensburg('ravensburg');