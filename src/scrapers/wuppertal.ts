import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.wuppertal.de/presse/meldungen/meldungen-2020/maerz20/zahlen-und-hotline-corona.php',
            /Am (?<updateDate>\d\d\.\d(?:<\/strong><strong>)?\. um \d+) Uhr lag die Zahl der Corona-Infizierten in Wuppertal bei (?<cumulatedInfected>\d+).+?Inklusive dieser Infizierten befinden sich (?<currentlyQuarantined>\d+) Menschen in Wuppertal in Quarantäne/
        );
        return {
            ...groups,
            NUTS: 'DEA1A',
            updateDate: moment.tz(groups.updateDate.replace(/<\/strong><strong>/, ''), 'D.M.[ um ]H', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();