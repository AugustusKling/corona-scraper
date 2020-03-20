import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class Ostalbkreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.ostalbkreis.de/sixcms/detail.php?_topnav=36&_sub1=31788&_sub2=32062&_sub3=292448&id=292450',
            /<table border="1"><tr><td align="center" width="270"><b>Corona-Erkrankte im Ostalbkreis<\/b><\/td><td align="center" width="200"><b>Stand<\/b><\/td><\/tr>[^]*<tr><td align="center">(\d+)<\/td><td align="center">(.+)<\/td><\/tr>/
        );
        return {
            NUTS: 'DE11D',
            cumulatedInfected: parseInt(matches[1], 10),
            updateDate: moment.tz(matches[2], 'DD.MM.YYYY', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new Ostalbkreis();