import { appendFileSync, readdir } from 'fs';

import { Scraper } from './scraper';

async function scrape() {
    const scrapers = await new Promise<string[]>( ( resolve, reject ) => {
        readdir( __dirname + '/scrapers', ( err, files ) => {
            if ( err ) {
                reject( err );
            } else {
                resolve( files );
            }
        } );
    } );
    for(const scraperName of scrapers) {
        const scraper: Scraper = (await import( __dirname + '/scrapers/' + scraperName )).scraper;
        const scraperId = scraperName.replace(/[.]ts$/, '');
        try {
            const data = await scraper.get();
            const dataPoints = Array.isArray(data) ? data : [data];
            const meta = {
                scraper: scraperId,
                scrapedAt: new Date().toISOString()
            };
            for (const dataPoint of dataPoints) {
                appendFileSync('data/scrapes.jsonstream', JSON.stringify(Object.assign(dataPoint, meta)) + '\n', {
                    flag: 'a+'
                });
            }
        } catch (e) {
            console.warn('Failed to scrape: ' + scraperId, e);
        }
    }
}

scrape();