import { Scraper, parseNumber } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.corona-im-hok.de/',
            /<a href="(?<url>[^"]+)" target="_self">Verteilung Corona-Fälle in den Gemeinden Stand: (?<updateDate>[^<]+)<\/a>/
        );
    
        const ocrResults = await this.downloadAndOcr('https://www.corona-im-hok.de' + groups.url, {
            schöntal: {
                minX: 850,
                minY: 1400,
                maxX: 969,
                maxY: 1450
            },
            weißbach: {
                minX: 1190,
                minY: 1590,
                maxX: 1290,
                maxY: 1640
            },
            krautheim: {
                minX: 1300,
                minY: 1105,
                maxX: 1450,
                maxY: 1150
            },
            dörzback: {
                minX: 1650,
                minY: 1177,
                maxX: 1780,
                maxY: 1225
            },
            ingelfingen: {
                minX: 1420,
                minY: 1511,
                maxX: 1570,
                maxY: 1552
            },
            mulfingen: {
                minX: 2059,
                minY: 1453,
                maxX: 2176,
                maxY: 1499
            },
            forchtenberg: {
                minX: 929,
                minY: 1774,
                maxX: 1030,
                maxY: 1815
            },
            niedernhall: {
                minX: 1217,
                minY: 1854,
                maxX: 1307,
                maxY: 1897
            },
            künzelsau: {
                minX: 1780,
                minY: 1847,
                maxX: 1889,
                maxY: 1895
            },
            zweiflingen: {
                minX: 792,
                minY: 1996,
                maxX: 900,
                maxY: 2030
            },
            öhringen: {
                minX: 730,
                minY: 2348,
                maxX: 833,
                maxY: 2394
            },
            neuenstein: {
                minX: 1167,
                minY: 2270,
                maxX: 1272,
                maxY: 2320
            },
            kupferzell: {
                minX: 1569,
                minY: 2216,
                maxX: 1681,
                maxY: 2267
            },
            bretzfeld: {
                minX: 483,
                minY: 2598,
                maxX: 585,
                maxY: 2643
            },
            pfedelbach: {
                minX: 866,
                minY: 2631,
                maxX: 994,
                maxY: 2688
            },
            waldenburg: {
                minX: 1366,
                minY: 2555,
                maxX: 1463,
                maxY: 2605
            }
        });
        
        const cumulatedInfected = Object.values(ocrResults)
            .map(result => parseNumber(result.replace('<', '')))
            .reduce((a, b) => a + b);
    
        return {
            NUTS: 'DE119',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected
        };
    }
}

export const scraper = new ScraperImpl();