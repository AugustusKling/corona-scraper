import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.regionorebrolan.se/sv/',
            /<p><strong>Antal fall i Örebro län: (?<updateDate>\d+ \w+)<br \/><\/strong>(?<cumulatedInfected>\d+)<strong>\s*<\/strong>bekräftade fall varav (?<currentlyHospitalized>\d+) inlagda på vårdavdelning och (?<currentlyIntensiveCare>\d+) på intensivvårdsavdelning.\s*<\/p>/
        );
        return {
            ...groups,
            NUTS: 'SE024',
            updateDate: moment.tz(groups.updateDate, 'D MMM', 'sv', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();