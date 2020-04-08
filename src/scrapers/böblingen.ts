import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lrabb.de/start/Aktuelles/coronavirus.html',
            /Lagebericht vom (?<updateDate>[^<]+)<\/h1>[^]{0,100}<strong>Insgesamt (?<cumulatedInfected>\d+) Fälle<\/strong><br><strong>Davon (?<currentlyInfected>\d+) aktive Erkrankungen<\/strong><br><strong>(?<cumulatedRecovered>\d+) geheilte Fälle<\/strong><br><strong>(?<cumulatedDeaths>\d+) Todesfälle/
        );
        return {
            ...groups,
            NUTS: 'DE112',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();