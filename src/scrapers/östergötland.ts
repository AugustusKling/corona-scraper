import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.regionostergotland.se/Halsa-och-vard/aktuellt-om-coronaviruset/',
            /<p><strong>\w+ (?<updateDate>\d+ \w+ klockan \d+\.\d+)<\/strong><\/p>(?:[^](?!<p>))*?Totalt har (?<cumulatedDeaths>\d+) personer som bekräftats positiva med covid-19, avlidit i Östergötland\.\s*<\/li>\s*<li><strong>(?<currentlyHospitalized>\d+) personer i Östergötland vårdas vid lunchtid isolerade på sjukhus.(?:[^](?!<p>))*?>Det finns totalt (?<cumulatedInfected>\d+) bekräftade fall av covid-19 i Östergötland/
        );
        return {
            ...groups,
            NUTS: 'SE123',
            updateDate: moment.tz(groups.updateDate, 'D MMM[ klockan ]HH.mm', 'sv', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();