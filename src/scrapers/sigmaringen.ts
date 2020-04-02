import fetch from 'node-fetch';
import * as moment from 'moment-timezone';
import { Scraper } from '../scraper';

class Sigmaringen extends Scraper {
    public async get() {
        const response = await fetch('https://services1.arcgis.com/e7l8Y32XFZQbVW4p/arcgis/rest/services/Coronastatistik_Extern/FeatureServer/1/query?f=json&where=1%3D1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=STAND%20desc&resultOffset=0&resultRecordCount=1&cacheHint=true');
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseObject = await response.json();
    
        const latest = responseObject.features[0].attributes;
        return {
            NUTS: 'DE149',
            population: latest.EW,
            updateDate: moment(latest.STAND).toISOString(),
            cumulatedInfected: latest.ANZ_INF,
            cumulatedDeaths: latest.ANZ_TOD
        };
    }
}

export const scraper = new Sigmaringen();