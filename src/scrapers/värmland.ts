import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.regionvarmland.se/halsa-och-vard/coronavirus---covid-19/aktuellt-lage-i-varmland--covid-19/',
            /<p><strong>Bekräftade fall:<\/strong>\s*(?<cumulatedInfected>\d+)<br \/><strong>Totalt antal provtagna:<\/strong>\s*(?<cumulatedTested>\d+)<br \/><strong>Dödsfall:<\/strong><span>\s*(?<cumulatedDeaths>\d+)<\/span><\/p>\s*<p>Region Värmland har (?<currentlyHospitalized>\d+) inneliggande patienter som vårdas för coronavirusinfektion \(covid-19\)\.<\/p>[^]*?<p><em>Senast uppdaterad (?<updateDate>[^<]+)<\/em><\/p>/
        );
        return {
            ...groups,
            NUTS: 'SE061',
            updateDate: moment.tz(groups.updateDate, 'D MMM[ klockan ] HH.mm', 'sv', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();