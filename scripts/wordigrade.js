const wordigrade = require('wordigrade');
const languageCodes = require('iso-639-1');
const fs = require('fs');
const dir = './public/locales';
const locales = [];

/**
 * Grab available locales, output to json
 */
Object.keys(wordigrade.ea_out).forEach(locale => {
  locales.push({
    key: languageCodes.getName(locale),
    value: locale
  });

  fs.writeFileSync(`${dir}/${locale}.json`, JSON.stringify(wordigrade.ea_out[locale], null, 2));
});

/**
 * From available locales, output to json
 */
fs.writeFileSync(`${dir}/locales.json`, JSON.stringify(locales, null, 2));
