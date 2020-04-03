import { Scraper, parseNumber } from '../scraper';
import * as moment from 'moment-timezone';

class RheinNeckarKreis extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.rhein-neckar-kreis.de/,Lde/start/landratsamt/coronavirus+-+faq.html',
            /Aktuell gibt es <strong>(?<cumulatedInfected>\d+)<\/strong> positiv getestete Erkrankte; <strong>(?<cumulatedRecovered>\d+)<\/strong> Personen sind mittlerweile genesen. Die Zahl der Todesfälle in Zusammenhang mit dem Coronavirus liegt im Landkreis bei <strong>(?<cumulatedDeaths>\d+)<\/strong>[^]{0,50}?\(Stand: (?<updateDate>.{1,40}?)\)/
        );
        const updateDate = moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD');
        return [
            {
                ...groups,
                // Rhein-Neckar-Kreis
                NUTS: 'DE128',
                updateDate
            }
        ];
    }
}

export const scraper = new RheinNeckarKreis();