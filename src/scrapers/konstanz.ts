import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Konstanz extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lrakn.de/,Lde/service-und-verwaltung/aemter/gesundheit+und+versorgung/coronavirus',
            /Übersicht der aktuellen Lage im Landkreis Konstanz \(Stand \w+,  (?<updateDate>\d\d\.\d\d\.\d\d\d\d)\)[^]+?<td><strong>Gesamtanzahl Infizierte<\/strong><\/td>\s*<td><strong>(?<cumulatedInfected>\d+)<\/strong><\/td>[^]+?genesene Personen<\/td>\s*<td>(?<cumulatedRecovered>\d+)[^]+?in stationärer Behandlung<\/td>\s*<td>(?<currentlyHospitalized>\d+)<\/td>[^]+?verstorbene Personen<\/td>\s*<td>(?<cumulatedDeaths>\d+)<\/td>/
        );
        return {
            ...groups,
            NUTS: 'DE138',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Konstanz();