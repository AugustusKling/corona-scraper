import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.sll.se/',
            /<h2><span>(?<updateDate>\d+ \w+): Lägesrapport om arbetet med det nya coronaviruset<\/span><\/h2>\s*<p><span>Dagens rapport visar att [\d ]+ ytterligare personer har konstaterats ha sjukdomen covid-19, vilket innebär att totalt (?<cumulatedInfected>[\d ]+) personer är konstaterat smittade i Stockholm\. (?<cumulatedDeaths>[\d ]+) personer med bekräftad covid-19 har hittills avlidit i länet\. Cirka (?<cumulatedTested>[\d ]+) personer i Stockholm har provtagits för det nya coronaviruset\.\s*<\/span><\/p>/
        );
        return {
            ...groups,
            NUTS: 'SE110',
            updateDate: moment.tz(groups.updateDate, 'D MMM', 'sv', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();