import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.kreis-heinsberg.de/aktuelles/aktuelles/',
            /\(Meldung vom (?<updateDate>[^)]+)\)[^(]+?(?<cumulatedInfected>\d+) Fälle, (?<cumulatedRecovered>\d+) Genesene, (?<cumulatedDeaths>\d+) Todesfälle/,
            'windows-1252'
        );
        return {
            ...groups,
            NUTS: 'DEA29',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();