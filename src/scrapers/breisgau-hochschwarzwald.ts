import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.breisgau-hochschwarzwald.de/pb/Breisgau-Hochschwarzwald/Start/Service+_+Verwaltung/Corona-Virus.html',
            /<tr>\s*<td><strong>Stand<\/strong><\/td>\s*<td><strong>Fallzahlen gesamt<\/strong><\/td>\s*<td><strong>Stadt Freiburg<\/strong><\/td>\s*<td><strong>LK Breisgau-Hochschwarzwald<\/strong><\/td>\s*<\/tr>\s*<tr>\s*<td>(?<updateDate>.+?) Uhr<\/td>\s*<td>\d+<\/td>\s*<td>(?<freiburg>\d+)<\/td>\s*<td>(?<breisgauHochschwarzwald>\d+)<\/td>\s*<\/tr>/
        );
        const updateDate = moment.tz(groups.updateDate, 'DD.MM., HH:mm', 'Europe/Berlin').toISOString()
        return [
            {
                // Freiburg
                NUTS: 'DE131',
                cumulatedInfected: this.parseNumber(groups.freiburg),
                updateDate
            },
            {
                // Breisgau-Hochschwarzwald
                NUTS: 'DE132',
                cumulatedInfected: this.parseNumber(groups.breisgauHochschwarzwald),
                updateDate
            }
        ];
    }
}

export const scraper = new ScraperImpl();