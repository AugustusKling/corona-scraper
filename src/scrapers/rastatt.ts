import { Scraper, parseNumber } from '../scraper';
import * as moment from 'moment-timezone';

class Rastatt extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-rastatt.de/Startseite/aktuelles/corona+-+aktuelle+situation+im+landkreis+rastatt+und+stadtkreis+baden-baden.html',
            /<h2 class="basecontent-sub-heading">(?<updateDate>.{1,40}?) Uhr\)<\/h2>\s*<h3[^>]*>Aktuelle Fallzahl<\/h3>[^]+?Landkreis Rastatt: (?<cumulatedInfectedRastatt>\d+) Personen<br>Stadtkreis Baden-Baden: (?<cumulatedInfectedBadenBaden>\d+) Personen/
        );
        
        const updateDate = moment.tz(groups.updateDate, 'DD. MMM YYYY[(Stand: ]HH:mm', 'de', 'Europe/Berlin').toISOString();
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