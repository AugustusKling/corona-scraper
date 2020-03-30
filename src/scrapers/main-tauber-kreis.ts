import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class MainTauberKreis extends Scraper {
    public async get() {
        const { groups }= await this.downloadAndMatch(
            'https://www.main-tauber-kreis.de/Landratsamt/Aktuelles/Pressemitteilungen',
            /<span class="sr-only">Datum: <\/span>(?<updateDate>[^<]+?)<\/small>(?:[^](?!<span class="sr-only">))+Damit liegt die Gesamtzahl der bislang infizierten Personen bei (?<cumulatedInfected>\d+)\./
        );
        return {
            ...groups,
            NUTS: 'DE11B',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new MainTauberKreis();