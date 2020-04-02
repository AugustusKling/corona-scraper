import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const statisticUrlMatches = await this.downloadAndMatch(
            'https://www.baselland.ch/politik-und-behorden/direktionen/volkswirtschafts-und-gesundheitsdirektion/amt-fur-gesundheit/medizinische-dienste/kantonsarztlicher-dienst/aktuelles/covid-19-faelle-kanton-basel-landschaft',
            /"(?<statisticUrl>https:\/\/www\.statistik\.bl\.ch\/files\/sites\/Grafiken\/COVID19\/\d+_COVID19_BL\.htm)"/
        );
        const { groups } = await this.downloadAndMatch(
            statisticUrlMatches.groups.statisticUrl,
            /<pre id="data" style="display:none;">[^]*(?<updateDate>\d\d\-\d\d\-\d\d\d\d),(?<cumulatedInfected>\d+),(?<cumulatedRecovered>\d+),(?<cumulatedDeaths>\d+)\s*<\/pre>/
        );
        return {
            ...groups,
            NUTS: 'CH032',
            updateDate: moment.tz(groups.updateDate, 'DD-MM-YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();