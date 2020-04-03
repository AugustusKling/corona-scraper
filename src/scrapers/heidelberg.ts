import { Scraper, parseNumber } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.heidelberg.de/hd,Lde/coronavirus_+die+lage+in+heidelberg.html',
            /Informationen vom (?<updateDate>.{1,40}?)<\/h3>(?:[^](?!<\/h3>))*Im Stadtgebiet Heidelberg ist die Gesamtzahl aller bislang positiv getesteter Personen von \d+ \(\w+\) auf (?<cumulatedInfected>\d+) am \w+ gestiegen\. Insgesamt befinden sich laut Gesundheitsamt des Rhein-Neckar-Kreises, das auch für die Stadt Heidelberg zuständig ist, aktuell (?<cumulatedQuarantined>\d+) Personen in Quarantäne. Von den seit Beginn der Corona-Pandemie \d+ gemeldeten Infizierten aus Heidelberg sind zwischenzeitlich schon (?<cumulatedRecovered>\d+) Personen wieder vollständig gesundgeworden/
        );
        const updateDate = moment.tz(groups.updateDate, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD');
        return [
            {
                ...groups,
                // Heidelberg
                NUTS: 'DE125',
                updateDate
            }
        ];
    }
}

export const scraper = new ScraperImpl();