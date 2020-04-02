import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-waldshut.de/aktuelles/informationen-zum-neuartigen-coronavirus/',
            /\(Stand:? (?<updateDate>[^<]+) Uhr\)[^]+?derzeit (?<cumulatedInfected>\d+) Covid-19-Infizierte gemeldet[^]+?(?<cumulatedRecovered>\d+) Personen gelten(?: bereits)? als genesen[^]+?(?<currentlyHospitalized>\d+) Erkrankte befinden sich derzeit in stationärer Behandlung/
        );
        return {
            ...groups,
            NUTS: 'DE13A',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();