import { Scraper } from '../scraper';

class NeckarOdenwaldKreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.neckar-odenwald-kreis.de/Aktuelle+Themen/Neuigkeiten/Informationen+zu+dem+neuartigen+Coronavirus+(SARS_CoV_2)-p-5726.html',
            /Insgesamt gibt es nun (\d+) bestätigte Fälle im Kreis./
        );
        return {
            NUTS: 'DE128',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new NeckarOdenwaldKreis();