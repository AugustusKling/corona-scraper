import { Scraper } from '../scraper';
import fetch from 'node-fetch';
import * as moment from 'moment-timezone';
import * as parse from 'csv-parse';

class ScraperImpl extends Scraper {
    public async get() {
        const response = await fetch('https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-province/dpc-covid19-ita-province-latest.csv');
        if (!response.ok) {
            throw new Error('Failed to download: ' + response.statusText);
        }
        const responseText = await response.text();
        
        const records = await new Promise<Record<string, string>[]>((resolve, fail) => {
            parse(responseText, {
                columns: true
            }, (error, data) => {
                if (error) {
                    fail(error);
                } else {
                    resolve(data);
                }
            });
        });
        
        return records
            .filter(record => record.denominazione_provincia !== 'In fase di definizione/aggiornamento')
            // Provinces changed in Sardegna and are not mappable to NUTS codes yet.
            .filter(record => record.denominazione_regione !== 'Sardegna')
            .map(record => {
                return {
                    NUTS: codiceProvincialeToNuts[record.codice_provincia],
                    cumulatedInfected: record.totale_casi,
                    updateDate: moment.tz(record.data, 'YYYY-MM-DD HH:mm:ss', 'Europe/Rome').toISOString()
                };
            });
    }
}

export const scraper = new ScraperImpl();

// Mapping derived from https://www.istat.it/storage/codici-unita-amministrative/Codici-statistici-e-denominazioni-delle-ripartizioni-sovracomunali.zip
const codiceProvincialeToNuts = {
    '001': 'ITC11',
    '002': 'ITC12',
    '003': 'ITC15',
    '004': 'ITC16',
    '005': 'ITC17',
    '006': 'ITC18',
    '096': 'ITC13',
    '103': 'ITC14',
    '007': 'ITC20',
    '012': 'ITC41',
    '013': 'ITC42',
    '014': 'ITC44',
    '015': 'ITC4C',
    '016': 'ITC46',
    '017': 'ITC47',
    '018': 'ITC48',
    '019': 'ITC4A',
    '020': 'ITC4B',
    '097': 'ITC43',
    '098': 'ITC49',
    '108': 'ITC4D',
    '021': 'ITH10',
    '022': 'ITH20',
    '023': 'ITH31',
    '024': 'ITH32',
    '025': 'ITH33',
    '026': 'ITH34',
    '027': 'ITH35',
    '028': 'ITH36',
    '029': 'ITH37',
    '030': 'ITH42',
    '031': 'ITH43',
    '032': 'ITH44',
    '093': 'ITH41',
    '008': 'ITC31',
    '009': 'ITC32',
    '010': 'ITC33',
    '011': 'ITC34',
    '033': 'ITH51',
    '034': 'ITH52',
    '035': 'ITH53',
    '036': 'ITH54',
    '037': 'ITH55',
    '038': 'ITH56',
    '039': 'ITH57',
    '040': 'ITH58',
    '099': 'ITH59',
    '045': 'ITI11',
    '046': 'ITI12',
    '047': 'ITI13',
    '048': 'ITI14',
    '049': 'ITI16',
    '050': 'ITI17',
    '051': 'ITI18',
    '052': 'ITI19',
    '053': 'ITI1A',
    '100': 'ITI15',
    '054': 'ITI21',
    '055': 'ITI22',
    '041': 'ITI31',
    '042': 'ITI32',
    '043': 'ITI33',
    '044': 'ITI34',
    '109': 'ITI35',
    '056': 'ITI41',
    '057': 'ITI42',
    '058': 'ITI43',
    '059': 'ITI44',
    '060': 'ITI45',
    '066': 'ITF11',
    '067': 'ITF12',
    '068': 'ITF13',
    '069': 'ITF14',
    '070': 'ITF22',
    '094': 'ITF21',
    '061': 'ITF31',
    '062': 'ITF32',
    '063': 'ITF33',
    '064': 'ITF34',
    '065': 'ITF35',
    '071': 'ITF46',
    '072': 'ITF47',
    '073': 'ITF43',
    '074': 'ITF44',
    '075': 'ITF45',
    '110': 'ITF48',
    '076': 'ITF51',
    '077': 'ITF52',
    '078': 'ITF61',
    '079': 'ITF63',
    '080': 'ITF65',
    '101': 'ITF62',
    '102': 'ITF64',
    '081': 'ITG11',
    '082': 'ITG12',
    '083': 'ITG13',
    '084': 'ITG14',
    '085': 'ITG15',
    '086': 'ITG16',
    '087': 'ITG17',
    '088': 'ITG18',
    '089': 'ITG19',
    '090': 'ITG25',
    '091': 'ITG26',
    '092': 'ITG27',
    '095': 'ITG28',
    '104': 'ITG29',
    '105': 'ITG2A',
    '106': 'ITG2B',
    '107': 'ITG2C'
};