import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.breisgau-hochschwarzwald.de/pb/Breisgau-Hochschwarzwald/Start/Service+_+Verwaltung/Corona-Virus.html',
            /<tr>\s*<td><strong>Stand<\/strong><\/td>\s*<td><strong>Fallzahlen gesamt<\/strong><\/td>\s*<td><strong>Stadt Freiburg<\/strong><\/td>\s*<td><strong>LK Breisgau-Hochschwarzwald<\/strong><\/td>\s*<\/tr>\s*<tr>\s*<td>(.+?) Uhr<\/td>\s*<td><span[^>]*>\d+<\/span><\/td>\s*<td>(\d+)<\/td>\s*<td>\d+<\/td>\s*<\/tr>/
        );
        return {
            NUTS: 'DE131',
            cumulatedInfected: parseInt(matches[2], 10),
            updateDate: moment.tz(matches[1], 'DD.MM., HH:mm', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();