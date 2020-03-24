import fetch from 'node-fetch';

export abstract class Scraper {

    public abstract get(): Promise<Record<string, any> | Record<string, any>[]>;
    
    protected async downloadAndMatch(url: string, matcher: RegExp): Promise<string[] & { groups: Record<string, string>}> {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseText = await response.text();
        const matches = responseText.match(matcher);
        if (matches) {
            return matches;
        } else {
            throw new Error('Failed to extract.');
        }
    }
    
    protected parseNumber(value: string): number {
        return parseInt(value.replace(/\./g, ''), 10);
    }
}
