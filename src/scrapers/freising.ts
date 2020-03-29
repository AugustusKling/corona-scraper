import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.kreis-freising.de/news-veranstaltungen/news/detail/news/detail/News/aktuelle-informationen-zum-neuartigen-coronavirus-covid-19.html',
            /Im Landkreis Freising sind seit dem 29\. Februar 2020 insgesamt (?<cumulatedInfected>\d+) Personen \(Stand: (?<updateDate>[^)]{5,30}) Uhr\) positiv auf das neuartige Coronavirus \(COVID-19\) getestet worden. Seit dem 19. März sind (?<cumulatedDeaths>\d+) Personen an dem Virus verstorben\. (?<cumulatedRecovered>\d+) Personen sind inzwischen wieder genesen/
        );
        return {
            ...groups,
            NUTS: 'DE21B',
            updateDate: moment.tz(groups.updateDate, 'D.M.YY, H', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();