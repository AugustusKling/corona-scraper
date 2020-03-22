import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.tirol.gv.at/meldungen/meldung/artikel/update-coronavirus/',
            /Positive Coronavirus-Testergebnisse:\s*(\d+)[^]*Zahl der mittlerweile genesenen Personen:\s*(\d+)[^]*Innsbruck:\s*(\d+)[^]*Innsbruck-Land:\s*(\d+)[^]*Landeck:\s*(\d+)[^]*Imst:\s*(\d+)[^]*Lienz:\s*(\d+)[^]*Kufstein:\s*(\d+)[^]*Schwaz:\s*(\d+)[^]*Kitzbühel:\s*(\d+)[^]*Reutte:\s*(\d+)/
        );
        return [
            // Tyrol aggregate.
            {
                NUTS: 'AT33',
                cumulatedInfected: parseInt(matches[1], 10),
                cumulatedRecovered: parseInt(matches[2], 10),
            },
            // Außerfern / Reutte.
            {
                NUTS: 'AT331',
                cumulatedInfected: parseInt(matches[7], 10)
            },
            // Innsbruck + Innsbruck-Land.
            {
                NUTS: 'AT332',
                cumulatedInfected: parseInt(matches[3], 10) + parseInt(matches[4], 10)
            },
            // Osttirol.
            {
                NUTS: 'AT333',
                cumulatedInfected: parseInt(matches[7], 10)
            },
            // Tiroler Oberland.
            {
                NUTS: 'AT334',
                cumulatedInfected: parseInt(matches[5], 10) + parseInt(matches[6], 10)
            },
            // Tiroler Unterland.
            {
                NUTS: 'AT335',
                cumulatedInfected: parseInt(matches[8], 10) + parseInt(matches[9], 10) + parseInt(matches[10], 10)
            }
        ];
    }
}

export const scraper = new ScraperImpl();