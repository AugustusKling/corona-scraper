import { Scraper } from '../scraper';
import * as moment from 'moment';

class Göppingen extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.landkreis-goeppingen.de/start/_Aktuelles/coronavirus.html',
            /Bestätigte Corona-Fälle im Landkreis Göppingen: (\d+) <br>\(Stand ([^)]+)\)/
        );
        return {
            NUTS: 'DE114',
            cumulatedInfected: parseInt(matches[1], 10),
            updateDate: moment(matches[2], 'DD.MM.YYYY').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new Göppingen();