import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.kreis-heinsberg.de/aktuelles/aktuelles/?pid=5149',
            /Die aktuelle Corona-Statistik für den Kreis Heinsberg vom (?<updateDate>\d+\. \w+ \(Stand \d+) Uhr\)(?:[^](?!bestätigte))+?(?<cumulatedInfected>\d+) bestätigte Coronafälle im Kreis Heinsberg\. (?<cumulatedRecovered>\d+) Personen gelten inzwischen als geheilt, (?<cumulatedDeaths>\d+) Menschen sind verstorben\. Damit sind tagesaktuell (?<currentlyInfected>\d+) Menschen im Kreis Heinsberg infiziert\./,
            'windows-1252'
        );
        return {
            ...groups,
            NUTS: 'DEA29',
            updateDate: moment.tz(groups.updateDate, 'D. MMM[ (Stand ]HH', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();