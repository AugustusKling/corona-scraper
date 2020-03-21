import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class RheinNeckarKreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.rhein-neckar-kreis.de/start/landratsamt/coronavirus+-+faq.html',
            /Die Zahl der positiv getesteten Personen beträgt nun \d+\. Davon\s+(\d+) im Rhein\-Neckar\-Kreis und\s+\d+ im Stadtgebiet Heidelberg <i\>\(Stand: (.+?)\)/
        );
        return {
            NUTS: 'DE128',
            cumulatedInfected: parseInt(matches[1], 10),
            updateDate: moment.tz(matches[2], 'DD. MMMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new RheinNeckarKreis();