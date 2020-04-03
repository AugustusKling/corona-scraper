import { Scraper, parseNumber } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.sg.ch/tools/informationen-coronavirus.html',
            /<h4>(?<updateDate>[^<]+)<\/h4>(?:[^](?!<\/h4>))+<tr[^>]*><td[^>]*>laborbestätigte Fälle \(kumuliert\)<\/td>\s*<td[^>]*>(?<cumulatedInfected>\d+)<\/td>\s*<td>[^<]*<\/td>\s*<\/tr><tr[^>]*><td[^>]*>Hospitalisationen Isolation \(aktueller Stand\)<\/td>\s*<td>(?<currentlyHospitalizedIsolated>\d+)<\/td>\s*<td>[^<]*<\/td>\s*<\/tr><tr[^>]*><td[^>]*>Hospitalisationen Intensiv \(aktueller Stand\)<\/td>\s*<td>(?<currentlyIntensiveCare>\d+)<\/td>\s*<td>[^<]*<\/td>\s*<\/tr><tr[^>]*><td[^>]*>aus Spital entlassene \(kumuliert\)<\/td>\s*<td>\d+<\/td>\s*<td>[^<]*<\/td>\s*<\/tr><tr[^>]*><td[^>]*>Verstorbene \(kumuliert\)<\/td>\s*<td>(?<cumulatedDeaths>\d+)<\/td>/
        );
        return {
            ...groups,
            NUTS: 'CH055',
            updateDate: moment.tz(groups.updateDate, 'D. MMM YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            currentlyHospitalized: parseNumber(groups.currentlyHospitalizedIsolated) + parseNumber(groups.currentlyIntensiveCare)
        };
    }
}

export const scraper = new ScraperImpl();