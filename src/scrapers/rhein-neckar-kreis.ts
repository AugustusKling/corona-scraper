import { Scraper, parseNumber } from '../scraper';
import * as moment from 'moment-timezone';

class RheinNeckarKreis extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.rhein-neckar-kreis.de/,Lde/start/landratsamt/coronavirus+-+faq.html',
            /Im Rhein-Neckar-Kreis beträgt die Zahl der positiv getesteten Personen (?<rheinNeckar>\d+); im Stadtgebiet Heidelberg (?<heidelberg>\d+)\. <i>\(Stand: (?<updateDate>.{1,40}?)\)/
        );
        const updateDate = moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD');
        return [
            {
                // Heidelberg
                NUTS: 'DE125',
                cumulatedInfected: parseNumber(groups.heidelberg),
                updateDate
            },
            {
                // Rhein-Neckar-Kreis
                NUTS: 'DE128',
                cumulatedInfected: parseNumber(groups.rheinNeckar),
                updateDate
            }
        ];
    }
}

export const scraper = new RheinNeckarKreis();