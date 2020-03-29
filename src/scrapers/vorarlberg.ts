import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://vorarlberg.at/web/land-vorarlberg/contentdetailseite/-/asset_publisher/qA6AJ38txu0k/content/informationen-zum-coronavirus?article_id=554628',
            /Mit Stand \w+ \((?<updateDate>[^<]+?) Uhr sind in Vorarlberg (?<cumulatedInfected>\d+) Personen positiv auf das Coronavirus getestet worden/
        );
        return {
            ...groups,
            NUTS: 'AT34',
            updateDate: moment.tz(groups.updateDate, 'DD. MMM YYYY[) ]HH:mm', 'de', 'Europe/Berlin').toISOString()
        };
    }
}

export const scraper = new ScraperImpl();