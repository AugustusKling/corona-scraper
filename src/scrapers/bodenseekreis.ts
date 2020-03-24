import { Scraper } from '../scraper';

class Bodenseekreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.bodenseekreis.de/de/soziales-gesundheit/gesundheit/infektionsschutz/infektionskrankheiten/corona-virus/',
            /Labordiagnostisch bestätigte Infektionsfälle seit Ausbruch: <\/b>(\d+) \((\d+) gelten zwischenzeitlich als genesen\)[^]*?Personen in stationärer Behandlung: <\/b>(\d+)[^]*?Personen in behördlich angeordneter häuslicher Quarantäne: <\/b>rund (\d+)/
        );
        return {
            NUTS: 'DE147',
            cumulatedInfected: parseInt(matches[1], 10),
            cumulatedRecovered: parseInt(matches[2], 10),
            currentlyHospitalized: parseInt(matches[3], 10),
            cumulatedQuarantined: parseInt(matches[4], 10)
        };
    }
}

export const scraper = new Bodenseekreis();