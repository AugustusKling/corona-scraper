import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class MainTauberKreis extends Scraper {
    public async get() {
        const { groups }= await this.downloadAndMatch(
            'https://www.main-tauber-kreis.de/Landratsamt/Aktuelles/Pressemitteilungen',
            /Im Main-Tauber-Kreis wurden am \w+, (?<updateDate>[^,]{5,20}), \S+ neue Fälle einer Coronavirus-Infektion bestätigt. Damit liegt die Gesamtzahl der bislang infizierten Personen bei (?<cumulatedInfected>\d+)\./
        );
        return {
            ...groups,
            NUTS: 'DE11B',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new MainTauberKreis();