import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.lra-aoe.de/informationen-zu-corona/corona-das-gesundheitsamt-informiert',
            />(?<updateDate>[^<]+) h<\/p><p><i><strong><u>Situation im Landkreis Altötting:<\/u><\/strong><\/i><\/p><p>Bislang wurden im Landkreis Altötting<strong> (?<cumulatedInfected>\d+) Infektionen <\/strong>mit dem neuartigen Coronavirus<strong> SARS-CoV-2 nachgewiesen./
        );
        return {
            ...groups,
            NUTS: 'DE214',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();