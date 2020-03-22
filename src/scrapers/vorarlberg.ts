import { Scraper } from '../scraper';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://vorarlberg.at/web/land-vorarlberg/contentdetailseite/-/asset_publisher/qA6AJ38txu0k/content/informationen-zum-coronavirus?article_id=554628',
            /Insgesamt (\d+) Personen wurden positiv getestet/
        );
        return {
            NUTS: 'AT34',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new ScraperImpl();