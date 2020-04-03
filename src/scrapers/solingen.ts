import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.solingen.de/de/inhalt/coronavirus/',
            />Stand (?<updateDate>[^<]+)<\/p>[^]+?Aktuell sind (?<currentlyInfected>\d+) Personen nachgewiesen infiziert, (?<currentlyHospitalized>\d+) Patienten werden derzeit stationär behandelt, die übrigen ambulant betreut\.<\/p><p>Insgesamt wurden seit Ausbruch der Pandemie in Solingen bisher (?<cumulatedInfected>\d+) bestätigte Fälle gemeldet, \d+ sind seit gestern neu hinzugekommen\. (?<cumulatedRecovered>\d+) Menschen sind wieder genesen\. (?<cumulatedDeaths>\d+) (?:Todesfall ist|Todesfälle sind) zu beklagen\.<\/p><p>In häuslicher Quarantäne befinden sich derzeit insgesamt (?<currentlyQuarantined>\d+) Personen/
        );
        return {
            ...groups,
            NUTS: 'DEA19',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY[ - ]HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();