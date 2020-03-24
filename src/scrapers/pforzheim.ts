import { Scraper } from '../scraper';

class NeckarOdenwaldKreis extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.enzkreis.de/Kreis-Verwaltung/Bauen-Naturschutz-Umwelt-Gesundheit-und-Infrastruktur/Gesundheitsamt/Hilfreiche-Information-%C3%BCber-das-Corona-Virus/index.php?La=1&object=tx,2891.1978.1&kat=&kuo=2&sub=0',
            /Aktuell gibt es in Pforzheim (\d+) bestätigte Corona-Fälle/
        );
        return {
            NUTS: 'DE129',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new NeckarOdenwaldKreis();