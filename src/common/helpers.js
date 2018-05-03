const generateId = prefix => `${prefix || 'generatedid'}-${Math.ceil(1e5 * Math.random())}`;

const getLocale = (messages = {}) => {
  const locale =
    process.env.REACT_APP_LOCALE ||
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.userLanguage;

  return locale.match(/^[A-Za-z]+-[A-Za-z]+$/) && !messages[locale] ? locale.split('-')[0] : locale;
};

const noop = Function.prototype;

const DEV_MODE = process.env.REACT_APP_ENV === 'development';

const FULFILLED_ACTION = base => `${base}_FULFILLED`;

const PENDING_ACTION = base => `${base}_PENDING`;

const REJECTED_ACTION = base => `${base}_REJECTED`;

export const helpers = {
  generateId,
  getLocale,
  noop,
  DEV_MODE,
  FULFILLED_ACTION,
  PENDING_ACTION,
  REJECTED_ACTION
};

export default helpers;
