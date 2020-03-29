import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class AlbDonauKreis extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.alb-donau-kreis.de/alb-donau-kreis/startseite/dienstleistungen+service/coronavirus.html',
            /Stand: (?<updateDate>[^<]+?)<\/h5>\s*<ul><li>Insgesamt: \S+ Fälle<\/li><li>Alb-Donau-Kreis \(rund (?<populationAlbDonau>\S+) Einwohner\): (?<cumulatedInfectedAlbDonau>\S+) Fälle<\/li><li>Stadtkreis Ulm \(rund (?<populationUlm>\S+) Einwohner\): (?<cumulatedInfectedUlm>\S+) Fälle/
        );
        const updateDate = moment.tz(groups.updateDate, 'DD.MM.YYYY', 'Europe/Berlin').format('YYYY-MM-DD');
        return [
            {
                // Alb-Donau-Kreis
                NUTS: 'DE145',
                cumulatedInfected: groups.cumulatedInfectedAlbDonau,
                updateDate,
                population: groups.populationAlbDonau
            },
            {
                // Ulm
                NUTS: 'DE144',
                cumulatedInfected: groups.cumulatedInfectedUlm,
                updateDate,
                population: groups.populationUlm
            }
        ];
    }
}

export const scraper = new AlbDonauKreis();