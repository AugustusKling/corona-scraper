import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class SchwäbischHall extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.lrasha.de/index.php?id=953?&no_cache=1&publish[id]=1107342&publish[start]=',
            /Stand: \w+, (.+)(?:&nbsp;|\s)+Uhr[^]+Im Landkreis Schw&auml;bisch Hall haben(?:&nbsp;|\s)+wir aktuell(?:&nbsp;|\s+)<strong>(\d+)<\/strong>&nbsp;best&auml;tigte Corona-Erkrankte/
        );
        return {
            NUTS: 'DE11A',
            cumulatedInfected: parseInt(matches[2], 10),
            updateDate: moment.tz(matches[1], 'DD.MM.YYYY, HH:mm', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new SchwäbischHall();