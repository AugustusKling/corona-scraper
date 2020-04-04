import { Scraper, parseNumber } from '../scraper';
import fetch from 'node-fetch';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const response = await fetch('https://sh.ch/CMS/content.jsp?contentid=3209198&language=DE');
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseObject = await response.json();
        const html = responseObject.data_post_content
            .replace(/&#(\d+);/g, (wholeMatch: string, group: string) => String.fromCharCode(parseInt(group, 10)))
            .replace(/&nbsp;/g, ' ').replace(new RegExp(decodeURIComponent('%C2%A0'), 'g'), ' ')
            .replace(/&auml;/g, 'ä')
            .replace(/&uuml;/g, 'ü');
        
        const { groups } = html.match(
            /<p class="post_text">Im Kanton Schaffhausen gibt es aktuell \(Stand (?<updateDate>[^)]+)\):\s*<\/p>\s*<p class="post_text"><strong>Anzahl Infizierte Fälle \(kumuliert\): (?<cumulatedInfected>\d+)<\/strong><\/p>\s*<p class="post_text"><strong>Anzahl Hospitalisationen Isolation \(aktuell\): (?<currentlyHospitalizedIsolated>\d+)<\/strong><\/p>\s*<p class="post_text"><strong>Anzahl Hospitalisationen Intensiv \(aktuell\): (?<currentlyIntensiveCare>\d+)<\/strong><\/p>\s*<p class="post_text"><strong>Verstorbene \(kummuliert\): (?<cumulatedDeaths>\d+)/
        );
        return {
            ...groups,
            NUTS: 'CH052',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            currentlyHospitalized: parseNumber(groups.currentlyHospitalizedIsolated) + parseNumber(groups.currentlyIntensiveCare)
        };
    }
}

export const scraper = new ScraperImpl();