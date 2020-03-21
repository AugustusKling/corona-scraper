import { Scraper } from '../scraper';

class ScraperImpl extends Scraper {
    public async get() {
        const matches = await this.downloadAndMatch(
            'https://www.lrasbk.de/Kurzmen%C3%BC/Suche/index.php?qs=insgesamt+best%E4tigte+f%E4lle&opt3=&vt_exclude=&opt6=&vt_dat_von=&vt_dat_bis=&opt4=3&sd=-1&max_1=10&NavID=2961.10',
            /<em>insgesamt<\/em>\s+(\d+)\s+<em>best.tigte<\/em>\s+<em>F.lle<\/em>/
        );
        return {
            NUTS: 'DE136',
            cumulatedInfected: parseInt(matches[1], 10)
        };
    }
}

export const scraper = new ScraperImpl();