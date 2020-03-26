import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-waldshut.de/aktuelles/informationen-zum-neuartigen-coronavirus/',
            /Bis \w+, (?<updateDate>.{10,40}) Uhr, waren (?<cumulatedInfected>\d+) Coronavirus-Fälle gemeldet/
        );
        return {
            ...groups,
            NUTS: 'DE13A',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();