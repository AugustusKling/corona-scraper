import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Ostalbkreis extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.ostalbkreis.de/sixcms/detail.php?_topnav=36&_sub1=31788&_sub2=32062&_sub3=292448&id=292450',
            /Corona-Erkrankte im Ostalbkreis<\/b><\/td><td[^>]*><b>Aus Isolation Entlassene<\/b><\/td><td[^>]*><b>Aktive Fälle<\/b><\/td><td[^>]*><b>Stand<\/b><\/td><\/tr>\s*<tr><td[^>]*>(?<cumulatedInfected>\d+)<\/td><td[^>]*>(?<cumulatedRecovered>\d+)<\/td><td[^>]*>(?<currentlyInfected>\d+)<\/td><td[^>]*>(?<updateDate>[^<]+)<\/td>/
        );
        return {
            ...groups,
            NUTS: 'DE11D',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Ostalbkreis();