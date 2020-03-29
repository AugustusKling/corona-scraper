import fetch from 'node-fetch';
import { Scraper } from '../scraper';
import * as moment from 'moment-timezone';

class ScraperImpl extends Scraper {
    public async get() {
        const response = await fetch('https://services.arcgis.com/r7GhuZjF2UKLvKNF/arcgis/rest/services/CoronavirusSituationNeu/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&resultOffset=0&resultRecordCount=2000&cacheHint=true');
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseObject = await response.json();
    
        const latest = responseObject.features[responseObject.features.length - 1].attributes;
        return {
            NUTS: 'DEA2B',
            updateDate: moment.tz(latest.Datum, 'DD.MM.', 'de', 'Europe/Berlin').format('YYYY-MM-DD'),
            cumulatedInfected: latest.confirmed,
            cumulatedRecovered: latest.recovered,
            cumulatedDeaths: latest.death,
            currentlyQuarantined: latest.quarantine
        };
    }
}

export const scraper = new ScraperImpl();