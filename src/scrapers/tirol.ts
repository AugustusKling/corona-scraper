import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.tirol.gv.at/gesundheit-vorsorge/infekt/coronavirus-covid-19-informationen/',
            /Aktuelle Zahlen \(Stand: (.+?) Uhr\)[^]*In Tirol gibt es derzeit (.+?) positive Coronavirus-Testergebnisse[^]*>((?:\d|\.)+) Tests wurden in Tirol durchgeführt[^]*Innsbruck:\s*(\d+)[^]*Innsbruck-Land:\s*(\d+)[^]*Landeck:\s*(\d+)[^]*Imst:\s*(\d+)[^]*Lienz:\s*(\d+)[^]*Kufstein:\s*(\d+)[^]*Schwaz:\s*(\d+)[^]*Kitzbühel:\s*(\d+)[^]*Reutte:\s*(\d+)/
        );
        
        const updateDate = moment.tz(matches[1], 'DD. MMM YYYY,&nbsp;HH.mm', 'de', 'Europe/Berlin').toISOString()
        return [
            // Tyrol aggregate.
            {
                NUTS: 'AT33',
                cumulatedInfected: this.parseNumber(matches[2]),
                cumulatedTested: this.parseNumber(matches[3]),
            },
            // Außerfern / Reutte.
            {
                NUTS: 'AT331',
                cumulatedInfected: this.parseNumber(matches[12])
            },
            // Innsbruck + Innsbruck-Land.
            {
                NUTS: 'AT332',
                cumulatedInfected: this.parseNumber(matches[4]) + this.parseNumber(matches[5])
            },
            // Osttirol.
            {
                NUTS: 'AT333',
                cumulatedInfected: this.parseNumber(matches[8])
            },
            // Tiroler Oberland.
            {
                NUTS: 'AT334',
                cumulatedInfected: this.parseNumber(matches[6]) + this.parseNumber(matches[7])
            },
            // Tiroler Unterland.
            {
                NUTS: 'AT335',
                cumulatedInfected: this.parseNumber(matches[9]) + this.parseNumber(matches[10]) + this.parseNumber(matches[11])
            }
        ];
    }
}

export const scraper = new ScraperImpl();