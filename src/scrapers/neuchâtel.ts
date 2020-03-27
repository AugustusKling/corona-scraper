import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.ne.ch/autorites/DFS/SCSP/medecin-cantonal/maladies-vaccinations/Pages/Coronavirus.aspx',
            /Neuchâtel\s+(?<updateDate>[^<]+)<\/span><br>Nombre de cas confirmés &#58; (?<cumulatedInfected>\d+) personnes<br>Nombre de décès &#58; (?<cumulatedDeaths>\d+)/
        );
        return {
            ...groups,
            NUTS: 'CH024',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY, HH[h]mm', 'fr', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();