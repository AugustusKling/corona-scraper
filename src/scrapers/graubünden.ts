import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.gr.ch/DE/institutionen/verwaltung/djsg/ga/coronavirus/info/aktuell/Seiten/fallzahlen-erklaehrung.aspx',
            /Fallzahlen\*?\s+(?<updateDate>\d\d\.\d\d\.\d\d\d\d)[^]+<div class="corona-message">Bestätigte Fälle: (?<cumulatedInfected>\d+)<br>Personen in Spitalpflege: (?<currentlyHospitalized>\d+)<br>Verstorbene Personen: (?<cumulatedDeaths>\d+)/
        );
        return {
            ...groups,
            NUTS: 'CH056',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();