import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://remscheid.de/pressearchiv/meldungen-2020/03-maerz/146380100000143530.php',
            /<h2[^>]*>(?<updateDate>\d+\.\d+\.\d{4})(?:[^](?!<h2>))+?aktuell (?<cumulatedInfected>\d+) positiv getestete Remscheiderinnen und Remscheider(?:[^](?!<h2>))+?(?<cumulatedRecovered>\d+) aller positiv getesteten Remscheiderinnen und Remscheidern gelten als genesen/
        );
        return {
            ...groups,
            NUTS: 'DEA18',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();