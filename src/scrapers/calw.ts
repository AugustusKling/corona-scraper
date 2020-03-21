import { Scraper } from '../scraper';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.kreis-calw.de/Schnellnavigation/Startseite/index.php?NavID=2442.710.1',
            /Die nun insgesamt vorliegenden (\d+) F&auml;lle verteilen sich wie folgt im Kreisgebiet/
        );
        return {
            NUTS: 'DE12A',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new ScraperImpl();