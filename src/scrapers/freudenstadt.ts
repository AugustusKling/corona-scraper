import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-freudenstadt.de/Startseite/Aktuell/aktuelle+situation+im+landkreis+freudenstadt.html',
            /Nach Auswertung der am \w+, (?<updateDate>\d+\. \w+ \d{4}) eingegangenen Laborergebnisse wurden nun insgesamt (?<cumulatedInfected>\d+) Personen im Landkreis Freudenstadt positiv auf eine Infektion mit dem Coronavirus getestet/
        );
        return {
            ...groups,
            NUTS: 'DE12C',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();