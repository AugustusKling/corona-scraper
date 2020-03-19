import { Scraper } from '../scraper';
import fetch from 'node-fetch';

class Bodenseekreis extends Scraper {
    public async get() {
        const response = await fetch('https://www.bodenseekreis.de/de/soziales-gesundheit/gesundheit/infektionsschutz/infektionskrankheiten/corona-virus/');
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseText = await response.text();
        const matches = responseText.match(/labordiagnostisch bestätigte Infektionen:&nbsp;(\d+) Personen <\/b><\/li><li><b>in behördlich angeordneter häuslicher Quarantäne: circa&nbsp;(\d+) Personen/);
        if (matches) {
            return {
                scrapedAt: new Date().toISOString(),
                NUTS: 'DE147',
                cumulatedInfected: parseInt(matches[1], 10),
                cumulatedQuarantined: parseInt(matches[2], 10)
            };
        } else {
            throw new Error('Failed to extract.');
        }
    }
}

export const scraper = new Bodenseekreis('bodenseekreis');