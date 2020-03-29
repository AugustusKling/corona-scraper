import fetch from 'node-fetch';
import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const response = await fetch('https://geo.muelheim-ruhr.de/api/action/datastore/search.json?resource_id=d8cdb7f3-95ca-40ec-91b8-a85686ec537c&limit=1');
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseObject = await response.json();
        if (!responseObject.success) {
            throw new Error('Unknown error status from server');
        }
    
        const latest = responseObject.result.records[0];
        return {
            NUTS: 'DEA16',
            updateDate: latest['date ISO 8601'],
            cumulatedInfected: latest.cases,
            cumulatedRecovered: latest.recovered,
            cumulatedDeaths: latest.deaths,
            currentlyQuarantined: latest.quarantine
        };
    }
}

export const scraper = new ScraperImpl();