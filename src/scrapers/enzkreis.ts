import { Scraper } from '../scraper';

class Enzkreis extends Scraper {
    public async get() {
        const { groups } = await this.downloadAndMatch(
            'https://www.enzkreis.de/Quicknavigation/Start/Gesundheitsamt-informiert-%C3%BCber-das-neue-Coronavirus-SARS-CoV-2-83-best%C3%A4tigte-F%C3%A4lle-in-Pforzheim-und-im-Enzkreis.php?object=tx,2891.6&ModID=7&FID=2891.1978.1',
            /In Pforzheim gibt es (?<cumulatedInfectedPforzheim>\d+) bestätigte Corona-Fälle, im Enzkreis (?<cumulatedInfectedEnzkreis>\d+)/
        );
        return [
            {
                // Enzkreis
                NUTS: 'DE12B',
                cumulatedInfected: groups.cumulatedInfectedEnzkreis
            },
            {
                // Pforzheim
                NUTS: 'DE129',
                cumulatedInfected: groups.cumulatedInfectedPforzheim
            }
        ];
    }
}

export const scraper = new Enzkreis();