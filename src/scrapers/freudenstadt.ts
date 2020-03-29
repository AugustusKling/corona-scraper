import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-freudenstadt.de/Startseite/Aktuell/aktuelle+situation+im+landkreis+freudenstadt.html',
            /Nach Auswertung der am Sonntag \((?<updateDate>[^)]+)\) eingegangenen Laborergebnisse ist die Zahl der im Landkreis Freudenstadt auf den Coronavirus positiv getesteten Personen auf (?<cumulatedInfected>\d+) gestiegen/
        );
        return {
            ...groups,
            NUTS: 'DE12C',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();