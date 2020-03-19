import { appendFileSync } from 'fs';

import { scraper as ravensburg } from './scrapers/ravensburg';
import { scraper as sigmaringen } from './scrapers/sigmaringen';
import { scraper as bodenseekreis } from './scrapers/bodenseekreis';

async function scrape() {
    for(const scraper of [ravensburg, sigmaringen, bodenseekreis]) {
        try {
            const data = await scraper.get();
            appendFileSync('data/scrapes.jsonstream', JSON.stringify(Object.assign(data, {scraper: scraper.id})) + '\n', {
                flag: 'a+'
            });
        } catch (e) {
            console.warn('Failed to scrape: ' + scraper.id, e);
        }
    }
}

scrape();