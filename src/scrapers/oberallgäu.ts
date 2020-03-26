import { Scraper, parseNumber } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.oberallgaeu.org/de/news/detail/corona:-newsticker-oberallgaeu.html',
            /\+\+(?<updateDate>\d\d\.\d\d\.\d\d\d\d)\+\+\s*Aktuell insgesamt \d+\s*bestätigte Fälle für OA\/KE\s*\((?<oa>\d+)\s*OA\s*\/\s*(?<ke>\d+)\s*KE\)/
        );
        const updateDate = moment.tz(groups.updateDate, 'DD.MM.YYYY', 'Europe/Berlin').format('YYYY-MM-DD');
        return [
            {
                // Kempten
                NUTS: 'DE273',
                updateDate,
                cumulatedInfected: parseNumber(groups.ke)
            },
            {
                // Oberallgäu
                NUTS: 'DE27E',
                updateDate,
                cumulatedInfected: parseNumber(groups.oa)
            },
        ];
    }
}

export const scraper = new ScraperImpl();