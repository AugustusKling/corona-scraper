import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.memmingen.de/aktuell-presse/nachrichten-und-termine/aktuell/singlenews-aktuelles/news/detail/News/aktuelle-zahl-der-infektionen-in-memmingen.html',
            /(?<updateDate>\d\d\.\d\d\.\d\d\d\d)\s*[\-:]\s*(?<cumulatedInfected>\d+) bestätigte (?:Fälle|Coronafälle)/
        );
        return {
            ...groups,
            NUTS: 'DE274',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();