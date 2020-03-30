import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.fr.ch/covid19/sante/covid-19/coronavirus-statistiques-evolution-de-la-situation-dans-le-canton',
            /<tr>\s*<th><strong>Date<\/strong><\/th>\s*<th><strong>Personnes hospitalisées<\/strong><\/th>\s*<th><strong>dont soins intensifs<\/strong><\/th>\s*<th><strong>Total décès<\/strong><\/th>\s*<th><strong>Total cas avérés<\/strong><\/th>\s*<\/tr>\s*<\/thead>\s*<tbody>\s*<tr>\s*<td>(?<updateDate>.{8})<\/td>\s*<td>(?<currentlyHospitalized>\d+)<\/td>\s*<td>(?<currentlyIntensiveCare>\d+)<\/td>\s*<td>(?<cumulatedDeaths>\d+)<\/td>\s+<td>(?<cumulatedInfected>\d+)<\/td>/
        );
        return {
            ...groups,
            NUTS: 'CH022',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YY', 'fr', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();