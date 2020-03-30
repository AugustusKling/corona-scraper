import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.donau-ries.de/Landratsamt/Buergerservice/Aufgabenbereiche/Gesundheitsamt-Humanmedizin.aspx',
            /(?<updateDate>\d\d\.\d\d\.\d\d\d\d \d\d:\d\d)[^+]+?Das Gesundheitsamt des Landratsamtes Donau-Ries meldet mittlerweile\s+(?<cumulatedInfected>\d+)\s*bestätigte Erkrankte/
        );
        return {
            ...groups,
            NUTS: 'DE27D',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();