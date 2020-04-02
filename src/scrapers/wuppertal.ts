import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.wuppertal.de/presse/meldungen/meldungen-2020/maerz20/zahlen-und-hotline-corona.php',
            /Am (?<updateDate>\d+(?:<\/strong><strong>)?\.\d+\. um \d+) Uhr sind für Wuppertal folgende Zahlen gemeldet[^]+?<tr>\s*<td><strong>Bestätigte Fälle \(Gesamtzahl infizierte Menschen\):<\/strong><\/td>\s*<td><strong>(?<cumulatedInfected>\d+)<\/strong><\/td>\s*<\/tr>\s*<tr>\s*<td>- davon aktuell infizierte Personen:<\/td>\s*<td>(?<currentlyInfected>\d+)<\/td>\s*<\/tr>\s*<tr>\s*<td>- davon genesene Personen:<\/td>\s*<td>(?<cumulatedRecovered>\d+)<\/td>\s*<\/tr>\s*<tr>\s*<td>- davon verstorbene Personen<\/td>\s*<td>(?<cumulatedDeaths>\d+)<\/td>\s*<\/tr>[^]+?<tr>\s*<td><strong>Gesamtzahl in Quarantäne:<\/strong><\/td>\s*<td><strong>(?<currentlyQuarantined>\d+)<\/strong><\/td>\s*<\/tr>/
        );
        return {
            ...groups,
            NUTS: 'DEA1A',
            updateDate: moment.tz(groups.updateDate.replace(/<\/strong><strong>/, ''), 'D.M.[ um ]H', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();