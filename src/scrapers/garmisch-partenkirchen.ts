import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lra-gap.de/de/coronavirus.html',
            /im Landkreis Garmisch-Partenkirchen <strong>(?<cumulatedInfected>\d+)<\/strong> nachweislich Corona-Erkrankte und <strong>(?<cumulatedDeaths>\d+)<\/strong> am Coronavirus Verstorbenen? \(Stand (?<updateDate>.{10,40}) Uhr\)/
        );
        return {
            ...groups,
            NUTS: 'DE21D',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();