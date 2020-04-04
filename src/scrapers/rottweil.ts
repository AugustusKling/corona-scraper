import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-rottweil.de/de/Landratsamt/aemter-Organigramm/Gesundheitsamt/Corona-Virus/Landkreis-uebersicht-Infizierte?skipEntranceUrl',
            /Stand (?<updateDate>\d\d\.\d\d\.\d\d\d\d): (?<cumulatedInfected>\d+) positiv Getestete/
        );
        return {
            ...groups,
            NUTS: 'DE135',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
        };
    }
}

export const scraper = new ScraperImpl();