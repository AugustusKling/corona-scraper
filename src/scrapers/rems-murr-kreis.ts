import { Scraper } from '../scraper';
import * as moment from 'moment';

class RemsMurrKreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.rems-murr-kreis.de/jugend-gesundheit-soziales/gesundheit/coronavirus-aktuelle-informationen/',
            /Bestätige Infektionen mit Coronavirus im Rems-Murr-Kreis: (\d+)/
        );
        return {
            NUTS: 'DE114',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new RemsMurrKreis();