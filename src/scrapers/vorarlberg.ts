import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://vorarlberg.at/web/land-vorarlberg/contentdetailseite/-/asset_publisher/qA6AJ38txu0k/content/informationen-zum-coronavirus?article_id=554628',
            /Von den (?<cumulatedInfected>\d+) positiv auf das Coronavirus getesteten Personen in Vorarlberg wurden am \w+ \(\d\d:\d\d Uhr\) (?<currentlyHospitalized>\d+) in Krankenhäusern behandelt, davon (?<currentlyIntensiveCare>\d+) intensivmedizinisch/
        );
        return {
            ...groups,
            NUTS: 'AT34'
        };
    }
}

export const scraper = new ScraperImpl();