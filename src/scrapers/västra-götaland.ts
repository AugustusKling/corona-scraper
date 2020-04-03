import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.vgregion.se/aktuellt/nyhetslista/regional-lagesrapport-covid-19/',
            /<h4>Regional rapport covid-19 Hälso- och sjukvården<\/h4>\s*<p>Idag, den (?<updateDate>\d+ \w+ kl\. \d+:\d+), finns totalt (?<cumulatedInfected>\d+) personer som testats positiva för covid-19 i Västra Götaland, samt (?<currentlyHospitalized>\d+) inneliggande patienter, varav (?<currentlyIntensiveCare>\d+) i intensivvård, med covid-19\.<\/p>/
        );
        return {
            ...groups,
            NUTS: 'SE232',
            updateDate: moment.tz(groups.updateDate, 'D MMM[ kl. ]HH:mm', 'sv', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();