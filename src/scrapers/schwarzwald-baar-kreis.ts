import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const pressreleases = await this.downloadAndMatch(
            'https://www.lrasbk.de/Kurzmen%C3%BC/Startseite/Infos-zum-Coronavirus.php?object=tx,2961.5&ModID=7&FID=2961.13112.1',
            /<a class="csslink_intern" href="(?<url>[^"]+)">\s*Coronavirus.+?Stand: (?<updateDate>\d\d\.\d\d\.\d\d\d\d)[^\d]+?(?<updateHour>\d+) Uhr\s*<\/a>/
        );
        const articleUrl = 'https://www.lrasbk.de' + pressreleases.groups.url.replace(/&amp;/g, '&');
        const { groups } = await this.downloadAndMatch(
            articleUrl,
            /(?<cumulatedInfected>\d+) bestätigte Coronavirus-Fälle.+?(?<cumulatedRecovered>\d+) Personen sind genesen/
        );
        return {
            ...groups,
            NUTS: 'DE136',
            updateDate: moment.tz(pressreleases.groups.updateDate + ' ' + pressreleases.groups.updateHour, 'DD.MM.YYYY HH', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();