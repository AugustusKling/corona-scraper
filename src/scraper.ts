import fetch from 'node-fetch';
import { Moment } from 'moment';

export abstract class Scraper {

    public abstract get(): Promise<RawScrape | RawScrape[]>;
    
    protected async downloadAndMatch(url: string, matcher: RegExp): Promise<string[] & { groups: Record<string, string>}> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseText = await response.text();
        const responseNormalized = responseText.replace(/&nbsp;|&#160;/g, ' ').replace(new RegExp(decodeURIComponent('%C2%A0'), 'g'), ' ').replace(/&auml;|&#228;/g, 'ä').replace(/&uuml;|&#252;/g, 'ü');
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