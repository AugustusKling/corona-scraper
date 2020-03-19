import { Scraper } from '../scraper';

class Ravensburg extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.rv.de/Startseite',
            /Derzeit gibt es bei uns (\d+) bekannte\s+Coronavirus-Infektionsf&auml;lle.<br>\s+Unter diesen best&auml;tigten\s+F&auml;llen sind (\d+) Personen wieder als gesund\s+diagnostiziert./
        );
        return {
            NUTS: 'DE148',
            cumulatedInfected: parseInt(matches[1], 10),
            cumulatedRecoved: parseInt(matches[2], 10)
        };
    }
}

export const scraper = new Ravensburg();