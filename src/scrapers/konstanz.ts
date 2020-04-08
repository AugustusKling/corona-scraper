import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Konstanz extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lrakn.de/,Lde/service-und-verwaltung/aemter/gesundheit+und+versorgung/coronavirus',
            /<img alt="Infizierte gesamt (?<cumulatedInfected>\d+), Genesene (?<cumulatedRecovered>\d+), stationär Behandelte (?<currentlyHospitalized>\d+), Verstorbene (?<cumulatedDeaths>\d+)"[^<]*><span class="zoomIcon"><\/span><\/a><\/div>\s*<figcaption[^<]*><span class="align-left">Aktuelle Entwicklung zum Stand (?<updateDate>\d+\. \w+ \d\d\d\d um \d+) Uhr/
        );
        return {
            ...groups,
            NUTS: 'DE138',
            updateDate: moment.tz(groups.updateDate, 'D. MMM YYYY[ um ]HH', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Konstanz();