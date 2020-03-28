import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lra-toelz.de/coronavirus',
            /(?:Im Landkreis werden heute Nachmittag, \w+, (?<updateDate1>\d\d\. \S+ \d\d\d\d) insgesamt (?<cumulatedInfected1>\d+) mit Covid-19 infizierte Personen gezählt)|(?:Im Landkreis Bad Tölz-Wolfratshausen ist bei insgesamt (?<cumulatedInfected2>\d+) Personen das Coronavirus nachgewiesen worden. Das ist der Stand vom heutigen \w+, (?<updateDate2>\d\d\. \S+ \d\d\d\d))|(?:Mit Stand \w+, (?<updateDate3>\d\d\. \S+ \d\d\d\d), sind im Landkreis Bad Tölz-Wolfratshausen (?<cumulatedInfected3>\d+) nachgewiesene Coronafälle gezählt worden)/
        );
        return {
            NUTS: 'DE216',
            updateDate: moment.tz(groups.updateDate1 || groups.updateDate2 || groups.updateDate3, 'DD. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: groups.cumulatedInfected1 || groups.cumulatedInfected2 || groups.cumulatedInfected3
        };
    }
}

export const scraper = new ScraperImpl();