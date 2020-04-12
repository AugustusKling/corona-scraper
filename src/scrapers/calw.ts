import fetch from 'node-fetch';
import * as moment from 'moment-timezone';
import { Scraper } from '../scraper';

class ScraperImpl extends Scraper {
    public async get() {
        const widgetsResponse = await fetch('https://www.arcgis.com/sharing/rest/content/items/386fa3fbc5b34612a90120b1f9806af7/data?f=json');
        if (!widgetsResponse.ok) {
            throw new Error('Failed to download: ' + widgetsResponse.statusText);
        }
        const widgetsResponseObject = await widgetsResponse.json();
        
        const headerSubtitle = widgetsResponseObject.headerPanel.subtitle;
        const updateDate = moment.tz(headerSubtitle, '[Stand: ]DD.MM.YYYY HH.mm', 'de', 'Europe/Berlin').toISOString();
    
        const latestDataFilter = widgetsResponseObject.widgets.find((widget: any) => widget.type === 'listWidget').datasets[0].filter.rules[0].rules[0].constraint.value;
        const dataResponse = await fetch(`https://services8.arcgis.com/lAommBP8gG02CGn3/arcgis/rest/services/Infektionen_WebLayer_02042020/FeatureServer/0/query?f=json&where=Corona_Falle_Verlauf_Insgesam_2%3D${ String(latestDataFilter) }&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=Gemeinden_Stand02042020_Kommu_1%20asc&resultOffset=0&resultRecordCount=50&cacheHint=true`);
        if (!dataResponse.ok) {
            throw new Error('Failed to download: ' + dataResponse.statusText);
        }
        const dataResponseObject = await dataResponse.json();
        const cumulatedInfected = dataResponseObject.features.map((f: any) => f.attributes.Corona_Falle_Verlauf_Insgesam_3).reduce((a: number, b: number) => a + b, 0);
        const cumulatedRecovered = dataResponseObject.features.map((f: any) => f.attributes.Corona_Falle_Verlauf_Insgesam_5).reduce((a: number, b: number) => a + b, 0);
        const cumulatedDeaths = dataResponseObject.features.map((f: any) => f.attributes.Corona_Falle_Verlauf_Insgesam_6).reduce((a: number, b: number) => a + b, 0);
        
        return {
            NUTS: 'DE12A',
            updateDate,
            cumulatedInfected,
            cumulatedRecovered,
            cumulatedDeaths
        };
    }
}

export const scraper = new ScraperImpl();