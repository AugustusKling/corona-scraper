import fetch from 'node-fetch';
const Iconv = require('iconv').Iconv;
const Buffer = require('buffer').Buffer;
import { Moment } from 'moment';

export abstract class Scraper {

    public abstract get(): Promise<RawScrape | RawScrape[]>;
    
    protected async downloadAndMatch(url: string, matcher: RegExp, encoding = 'utf-8'): Promise<string[] & { groups: Record<string, string>}> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseText = new Iconv(encoding, 'utf-8').convert(Buffer.from(await response.arrayBuffer())).toString('utf-8');
        const responseNormalized = responseText
            .replace(/&#(\d+);/g, (wholeMatch: string, group: string) => String.fromCharCode(parseInt(group, 10)))
            .replace(/&nbsp;/g, ' ')
            .replace(/&auml;/g, 'ä')
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
    return parseInt(value.replace(/[.']/g, ''), 10);
}