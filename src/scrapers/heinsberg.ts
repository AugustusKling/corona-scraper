import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.kreis-heinsberg.de/aktuelles/aktuelles/?pid=5142',
            /\((?<updateDate>[^)]+)\) Aktuell gibt es im Kreis Heinsberg (?<cumulatedInfected>\d+) best.tigte Coronavirus-Infektionen/
        );
        return {
            ...groups,
            NUTS: 'DEA29',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();