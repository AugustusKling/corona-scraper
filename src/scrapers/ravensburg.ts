import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Ravensburg extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.rv.de/corona',
            /<strong>(?<cumulatedInfected>\d+)\s+bekannte\s+Coronavirus-Infektionsfälle \(Stand\s+(?<updateDate>\d+\d\.\d\d\.\d{4})\)<\/strong><br>\s*davon sind <strong>(?<cumulatedRecoved>\d+) Personen wieder gesund<\/strong>(?:[^.]+(?!<\/ul>))<span[^>]*>(?<cumulatedDeaths>\d+)\s*<span[^>]*>Personen\s+sind verstorben/
        );
        return {
            ...groups,
            NUTS: 'DE148',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new Ravensburg();