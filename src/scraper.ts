import fetch from 'node-fetch';
const Iconv = require('iconv').Iconv;
const Buffer = require('buffer').Buffer;
import { Moment } from 'moment';
const { createWorker } = require('tesseract.js');
const sharp = require('sharp');

export interface Region {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}

export abstract class Scraper {

    public abstract get(): Promise<RawScrape | RawScrape[]>;
    
    protected async downloadAndMatch(url: string, matcher: RegExp, encoding = 'utf-8'): Promise<string[] & { groups: Record<string, string>}> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseText = new Iconv(encoding, 'utf-8//ignore').convert(Buffer.from(await response.arrayBuffer())).toString('utf-8');
        const responseNormalized = responseText
            .replace(/&#(\d+);/g, (wholeMatch: string, group: string) => String.fromCharCode(parseInt(group, 10)))
            .replace(/&nbsp;/g, ' ').replace(new RegExp(decodeURIComponent('%C2%A0'), 'g'), ' ')
            .replace(/&auml;/g, 'ä')
            .replace(/&aring;/g, 'å')
            .replace(/&ouml;/g, 'ö')
            .replace(/&uuml;/g, 'ü');
        const matches = responseNormalized.match(matcher);
        if (matches) {
            if (!matches.groups) {
                matches.groups = {};
            }
            return matches as typeof matches & { groups: Record<string, string>};
        } else {
            throw new Error('Failed to extract.');
        }
    }
    
    protected async downloadAndOcr<regionNames extends string>(url: string, regions: Record<regionNames, Region>): Promise<Record<regionNames, string>> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const image = await sharp(Buffer.from(await response.arrayBuffer())).threshold(40).toBuffer();
        
        const worker = createWorker();

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
            //tessedit_char_whitelist: '<0123456789'
        });
        const values = {} as Record<regionNames, string>;
        for (const [regionName, region] of (Object.entries(regions) as [regionNames, Region][])) {
            const rectangle = {
                left: region.minX,
                top: region.minY,
                width: region.maxX - region.minX,
                height: region.maxY - region.minY
            };
            const { data: { text } } = await worker.recognize(image, { rectangle });
            values[regionName] = text.trim();
        }
        await worker.terminate();
        return values;
    }
    
    protected parseNumber(value: string): number {
        return parseNumber(value);
    }
}

export interface RawScrape {
    NUTS: string;
    updateDate?: Moment | string;
    cumulatedInfected?: string | number;
}

export function parseNumber(value: string | number): number {
    if (typeof(value) === 'number') {
        return value;
    }
    return parseInt(value.replace(/[.' ]/g, ''), 10);
}