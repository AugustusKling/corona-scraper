import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-waldshut.de/aktuelles/informationen-zum-neuartigen-coronavirus/',
            /Im Landkreis Waldshut gibt es aktuell \(Stand (?<updateDate>[^<]+) Uhr\) (?<cumulatedInfected>\d+) bestätigte Coronavirus-Fälle.*?Von den bisher festgestellten Corona-Infektionen gelten(?: bereits)? (?<cumulatedRecovered>\d+) Personen als geheilt/
        );
        return {
            ...groups,
            NUTS: 'DE13A',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();