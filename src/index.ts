import { appendFileSync, readdir } from 'fs';
import { Moment } from 'moment';
import * as moment from 'moment-timezone';

import { Scraper, RawScrape, parseNumber } from './scraper';

interface Scrape {
    NUTS: string;
    updateDate?: string;
    cumulatedInfected: number;
    cumulatedDeaths?: number;
    cumulatedHospitalized?: number;
    cumulatedRecovered?: number;
    cumulatedTested?: number;
}

function convertTypes(data: RawScrape | RawScrape[]): Scrape[] {
    const dataPoints = Array.isArray(data) ? data : [data];
    const converted = [];
    for (const dataPoint of dataPoints) {
        if (moment.isMoment(dataPoint.updateDate)) {
            dataPoint.updateDate = (dataPoint.updateDate as Moment).toISOString();
        }
        if (dataPoint.cumulatedInfected === undefined) {
            throw new Error('Must give cumulatedInfected');
        }
        for(const [key, value] of Object.entries(dataPoint)) {
            if (!['NUTS', 'updateDate'].includes(key)) {
                if (value === undefined) {
                    delete (dataPoint as any)[key];
                } else {
                    (dataPoint as any)[key] = parseNumber(value);
                }
            }
        }
        converted.push(dataPoint as Scrape);
    }
    return converted;
}

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
    const selectedScrapers = scrapers.filter(scraperName => process.argv.length === 2 || scraperName.replace(/[.]ts$/, '') === process.argv[2]);
    for(const scraperName of selectedScrapers) {
        console.log('Running scraper: ' + scraperName);
        const scraper: Scraper = (await import( __dirname + '/scrapers/' + scraperName )).scraper;
        const scraperId = scraperName.replace(/[.]ts$/, '');
        try {
            const data = await scraper.get();
            const dataPoints = convertTypes(data);
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