import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class SchwäbischHall extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.lrasha.de/index.php?id=953?&no_cache=1&publish[id]=1107342&publish[start]=',
            /Stand: \w+, (.+) Uhr[^]+Im Landkreis Schw&auml;bisch Hall haben haben wir aktuell (\d+)&nbsp;best&auml;tigte Corona-Erkrankte./
        );
        return {
            NUTS: 'DE119',
            cumulatedInfected: parseInt(matches[2], 10),
            updateDate: moment.tz(matches[1], 'DD.MM.YYYY, HH:mm', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new SchwäbischHall();