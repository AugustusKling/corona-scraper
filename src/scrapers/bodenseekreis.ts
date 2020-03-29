import { Scraper, parseNumber } from '../scraper';

class Bodenseekreis extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.bodenseekreis.de/de/soziales-gesundheit/gesundheit/infektionsschutz/infektionskrankheiten/corona-virus/',
            /<li><b>Gestorbene Personen:\s*<\/b>(?<cumulatedDeaths>\d+)\s*<\/li>\s*<li><b>Personen in stationärer Behandlung:\s*<\/b>\s*(?<currentlyHospitalized>\d+)\s*<\/li>\s*<li><b>Labordiagnostisch bestätigte Infektionsfälle seit Ausbruch:\s*<\/b>\s*(?<cumulatedInfected>\d+)\s*\((?<cumulatedRecovered>\d+) gelten zwischenzeitlich als genesen\)[^]+?<li><b>Personen in behördlich angeordneter häuslicher Quarantäne:\s*<\/b>(?<currentlyQuarantined>\d+)\s*,\s*(?<cumulatedReleasedFromQuarantine>\d+)\s*weitere Personen wurden bereits wieder aus der Quarantäne entlassen</
        );
        return {
            ...groups,
            NUTS: 'DE147',
            cumulatedQuarantined: parseNumber(groups.currentlyQuarantined) + parseNumber(groups.cumulatedReleasedFromQuarantine)
        };
    }
}

export const scraper = new Bodenseekreis();