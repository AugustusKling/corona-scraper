import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lra-ffb.de/aktuelles/aktuelles/news/corona-epidemie-im-landkreis-fuerstenfeldbruck-neue-entwicklungen/',
            /Aktuelle Zahlen[^]+?Stand (?<updateDate>\d+\.\d+\.\d\d\d\d)[^]+?Im Landkreis Fürstenfeldbruck sind dem Gesundheitsamt (?<cumulatedInfected>\d+) Personen mit Wohnsitz im Landkreis Fürstenfeldbruck als positiv getestet gemeldet/
        );
        return {
            ...groups,
            NUTS: 'DE21C',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();