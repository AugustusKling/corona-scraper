import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://lra-aic-fdb.de/landratsamt/fachbereiche/abteilung-3-oeffentliche-sicherheit/gesundheitsamt/informationen-zum-coronavirus',
            /\w+,\s*(?<updateDate>\d\d\.\d\d\.\d\d\d\d)<\/p>(?:[^](?!\d\d\.\d\d\.\d\d\d\d<\/p>))+?Im Landkreis Aichach-Friedberg sind dem Gesundheitsamt <strong>aktuell (?<currentlyInfected>\d+)<\/strong> <strong>mit Corona infizierte Personen bekannt.<\/strong> Seit Beginn wurden Stand \w+ (?<cumulatedInfected>\d+) Personen mit positivem Testergebnis registriert, (?<cumulatedRecovered>\d+) davon sind bereits wieder gesund und aus der Quarantäne entlassen.(?:.(?!<\/p>))+?In den <strong>Kliniken an der Paar<\/strong> werden derzeit (?<cumulatedHospitalized>\d+) Patienten mit Covid-19 stationär behandelt/
        );
            return {
            ...groups,
            NUTS: 'DE275',
            updateDate: moment.tz(groups.updateDate, 'DD.MM.YYYY', 'de', 'Europe/Berlin').format('YYYY-MM-DD')
        };
    }
}

export const scraper = new ScraperImpl();