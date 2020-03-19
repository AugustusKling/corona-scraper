import { Scraper } from '../scraper';

class Bodenseekreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.bodenseekreis.de/de/soziales-gesundheit/gesundheit/infektionsschutz/infektionskrankheiten/corona-virus/',
            /labordiagnostisch bestätigte Infektionen:&nbsp;(\d+) Personen <\/b><\/li><li><b>in behördlich angeordneter häuslicher Quarantäne: circa&nbsp;(\d+) Personen/
        );
        return {
            NUTS: 'DE147',
            cumulatedInfected: parseInt(matches[1], 10),
            cumulatedQuarantined: parseInt(matches[2], 10)
        };
    }
}

export const scraper = new Bodenseekreis();