import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class NeckarOdenwaldKreis extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.neckar-odenwald-kreis.de/Aktuelle+Themen/Neuigkeiten/Informationen+zu+dem+neuartigen+Coronavirus+(SARS_CoV_2)-p-5726.html',
            /\+\+\+ Update vom (?<updateDate>.{5,20}(?:<\/strong><strong>)? \| \d{1,2}\.\d\d) Uhr \+\+\+[^+]+?Insgesamt gibt es(?: nun)? (?<cumulatedInfected>\d+) bestätigte Fälle/
        );
        return {
            ...groups,
            NUTS: 'DE127',
            updateDate: moment.tz(groups.updateDate.replace(/<\/strong><strong>/, ''), 'DD. MMM YYYY [ | ] H.mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new NeckarOdenwaldKreis();