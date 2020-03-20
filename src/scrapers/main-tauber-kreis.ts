import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class MainTauberKreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.main-tauber-kreis.de/Landratsamt/Aktuelles/Pressemitteilungen',
            /Coronavirus-Infektion neu best&auml;tigt. Damit steigt die Gesamtzahl auf (\d+)/
        );
        return {
            NUTS: 'DE11B',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new MainTauberKreis();