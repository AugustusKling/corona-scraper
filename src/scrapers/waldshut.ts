import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-waldshut.de/aktuelles/informationen-zum-neuartigen-coronavirus/',
            /Neu sind (?<cumulatedInfected>\d+) Personen im Landkreis positiv getestet und dem Gesundheitsamt gemeldet\. Es handelt sich um \d+ männliche und \d+ weibliche Personen\. (?<currentlyHospitalized>\d+) Erkrankte befinden sich in stationärer Behandlung.+?(?<cumulatedRecovered>\d+) Personen sind bereits wieder genesen.+?Stand: (?<updateDate>[^<]+?) Uhr/
        );
        return {
            ...groups,
            NUTS: 'DE13A',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();