import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const pressrelease = await this.downloadAndMatch(
            'https://www.landkreis-erding.de/aktuell/pressemitteilungen/?q=Corona&start=&end=',
            /<a href="(?<url>\/aktuell\/pressemitteilungen\/corona-virus-im-landkreis-erding-sachstand-(?<updateDate>\d{8})[^"]*)"/
        );
        const { groups } = await this.downloadAndMatch(
            'https://www.landkreis-erding.de' + pressrelease.groups.url,
            /<h1[^>]*>[^<]*Sachstand (?<updateDate>\d\d\.\d\d\.\d\d\d\d)[^<]*<\/h1>[^]+?Zahl der bestätigten Covid-19-Fälle im Landkreis Erding von \d+ auf (?<cumulatedInfected>\d+) Fälle angewachsen[^]+?Im Klinikum Landkreis Erding liegen derzeit (?<currentlyHospitalized>\d+) Covid-19-Patienten; \d+ werden auf der Isolierstation behandelt, (?<currentlyIntensiveCare>\d+) auf der Intensiv-Isolierstation/
        );
        return {
            ...groups,
            NUTS: 'DE21A',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();