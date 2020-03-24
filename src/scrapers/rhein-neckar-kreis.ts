import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class RheinNeckarKreis extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.rhein-neckar-kreis.de/,Lde/start/landratsamt/coronavirus+-+faq.html',
            /Die Zahl der positiv getesteten Personen beträgt nun \d+\. Davon\s+(?<rheinNeckar>\d+) im Rhein\-Neckar\-Kreis und\s+(?<heidelberg>\d+) im Stadtgebiet Heidelberg.+?\(Stand: (?<updateDate>.+?)\)/
        );
        const updateDate = moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD');
        return [
            {
                // Heidelberg
                NUTS: 'DE125',
                cumulatedInfected: this.parseNumber(groups.heidelberg),
                updateDate
            },
            {
                // Rhein-Neckar-Kreis
                NUTS: 'DE128',
                cumulatedInfected: this.parseNumber(groups.rheinNeckar),
                updateDate
            }
        ];
    }
}

export const scraper = new RheinNeckarKreis();