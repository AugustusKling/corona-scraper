import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Göppingen extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-goeppingen.de/start/_Aktuelles/coronavirus.html',
            /Bestätigte Corona-Fälle im Landkreis Göppingen: (?<cumulatedInfected>\d+) \(Stand (?<updateDate>[^)]+) Uhr\)/
        );
        
        return {
            ...groups,
            NUTS: 'DE114',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, H:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Göppingen();