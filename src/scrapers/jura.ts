import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.jura.ch/fr/Autorites/Coronavirus/Chiffres-H-JU/Evolution-des-cas-COVID-19-dans-le-Jura.html',
            /[^]+<tr>\s*<(?:td|th)[^>]*>(?:<strong>)?(?<updateDate>\d{1,2}\s*(?:<sup>[^<]*<\/sup>)?\s*\w+ \d\d\d\d)(?:<\/strong>)?<\/(?:td|th)>\s*<td>(?<cumulatedInfected>\d+)<\/td>\s*<td>(?<currentlyHospitalized>\d+)<\/td>\s*<td>(?<currentlyIntensiveCare>\d+)<\/td>(?:\s*<td>(?<cumulatedDeaths>\d+)<\/td>)?/
        );
        return {
            ...groups,
            NUTS: 'CH025',
            updateDate: moment.tz(groups.updateDate.replace(/<sup>[^<]*<\/sup>/, ' ').replace(/\s+/g, ' '), 'DD MMM YYYY', 'fr', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();