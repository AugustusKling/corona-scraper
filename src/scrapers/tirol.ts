import { Scraper, parseNumber } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.tirol.gv.at/gesundheit-vorsorge/infekt/coronavirus-covid-19-informationen/',
            /<h3>Aktuelle Zahlen \(Stand: \w+, (?<updateDate>[^<]+) Uhr\)<\/h3>\s*<p>Positive Coronavirus-Testergebnisse: (?<cumulatedInfectedTirol>(?:\d|\.)+)\s*<\/p>\s*<p>Davon wieder genesen: (?<cumulatedRecoveredTirol>(?:\d|\.)+)\s*<\/p>\s*<p>Zahl der verstorbenen Personen: (?<cumulatedDeathsTirol>(?:\d|\.)+)\s*<\/p>\s*<p>Zahl der bisher in Tirol durchgeführten Testungen: (?:\d|\.)+\s*<\/p>\s*<p>Zahl der durchgeführten Testungen, für die ein Ergebnis vorliegt: (?<cumulatedTestedTirol>(?:\d|\.)+)\s*<\/p>\s*<p>Zahl der noch in Auswertung befindlichen Testungen: (?:\d|\.)+\s*<\/p>\s*<p>Die Bezirkszahlen der positiven Testungen im Überblick:\s*<\/p><ul><li>Innsbruck: (?<cumulatedInfectedInsbruck>(?:\d|\.)+)<\/li><li>Innsbruck-Land: (?<cumulatedInfectedInsbruckLand>(?:\d|\.)+)<\/li><li>Landeck: (?<cumulatedInfectedLandeck>(?:\d|\.)+)<\/li><li>Imst: (?<cumulatedInfectedImst>(?:\d|\.)+)<\/li><li>Lienz: (?<cumulatedInfectedLienz>(?:\d|\.)+)<\/li><li>\s*Kufstein: (?<cumulatedInfectedKufstein>(?:\d|\.)+)<\/li><li>Schwaz: (?<cumulatedInfectedSchwaz>(?:\d|\.)+)<\/li><li>Kitzbühel: (?<cumulatedInfectedKitzbühel>(?:\d|\.)+)<\/li><li>Reutte: (?<cumulatedInfectedReutte>(?:\d|\.)+)\s*<\/li><\/ul>/
        );
        
        const updateDate = moment.tz(groups.updateDate, 'DD. MMM YYYY, HH.mm', 'de', 'Europe/Berlin').toISOString()
        return [
            // Tyrol aggregate.
            {
                NUTS: 'AT33',
                updateDate,
                cumulatedInfected: groups.cumulatedInfectedTirol,
                cumulatedRecovered: groups.cumulatedRecoveredTirol,
                cumulatedDeaths: groups.cumulatedDeathsTirol,
                cumulatedTested: groups.cumulatedTestedTirol
            },
            // Außerfern / Reutte.
            {
                NUTS: 'AT331',
                updateDate,
                cumulatedInfected: groups.cumulatedInfectedReutte
            },
            // Innsbruck + Innsbruck-Land.
            {
                NUTS: 'AT332',
                updateDate,
                cumulatedInfected: parseNumber(groups.cumulatedInfectedInsbruck) + parseNumber(groups.cumulatedInfectedInsbruckLand)
            },
            // Osttirol.
            {
                NUTS: 'AT333',
                updateDate,
                cumulatedInfected: groups.cumulatedInfectedLienz
            },
            // Tiroler Oberland.
            {
                NUTS: 'AT334',
                updateDate,
                cumulatedInfected: parseNumber(groups.cumulatedInfectedLandeck) + parseNumber(groups.cumulatedInfectedImst)
            },
            // Tiroler Unterland.
            {
                NUTS: 'AT335',
                updateDate,
                cumulatedInfected: parseNumber(groups.cumulatedInfectedKufstein) + parseNumber(groups.cumulatedInfectedSchwaz) + parseNumber(groups.cumulatedInfectedKitzbühel)
            }
        ];
    }
}

export const scraper = new ScraperImpl();