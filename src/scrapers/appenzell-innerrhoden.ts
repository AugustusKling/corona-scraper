import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.ai.ch/themen/gesundheit-alter-und-soziales/gesundheitsfoerderung-und-praevention/uebertragbare-krankheiten/coronavirus',
            /Bestätigte Fälle[^]+Stand (?<updateDate>.+?) Uhr[^]+?<li>(?<cumulatedInfected>\d+) infizierte Personen/
        );
        return {
            NUTS: 'CH054',
            cumulatedInfected: this.parseNumber(groups.cumulatedInfected),
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();