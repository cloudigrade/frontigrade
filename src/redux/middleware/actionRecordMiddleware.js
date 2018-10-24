/**
 * Concept, https://github.com/danislu/redux-action-replay-middleware
 */
import _has from 'lodash/has';
import _set from 'lodash/set';
import _get from 'lodash/get';
import apiTypes from '../../constants/apiConstants';

/**
 * Scrub token from header.
 * @param action {Object}
 * @returns {Object}
 */
const sanitizeAuthHeader = action => {
  if (_has(action, `payload.headers.${process.env.REACT_APP_AUTH_HEADER}`)) {
    _set(action, `payload.headers.${process.env.REACT_APP_AUTH_HEADER}`, 'XXXX');
  }

  if (_has(action, `payload.config.headers.${process.env.REACT_APP_AUTH_HEADER}`)) {
    _set(action, `payload.config.headers.${process.env.REACT_APP_AUTH_HEADER}`, 'XXXX');
  }

  return action;
};

/**
 * Scrub submitted passwords.
 * @param action {Object}
 * @returns {Object}
 */
const sanitizerPassword = action => {
  const payloadConfigData = JSON.parse(_get(action, 'payload.config.data', '{}'));

  if (_has(payloadConfigData, apiTypes.API_SUBMIT_AUTH_PASSWORD)) {
    _set(payloadConfigData, apiTypes.API_SUBMIT_AUTH_PASSWORD, '****');

    _set(action, 'payload.config.data', JSON.stringify(payloadConfigData));
  }

  return action;
};

/**
 * Scrub returned tokens.
 * @param action {Object}
 * @returns {Object}
 */
const sanitizeToken = action => {
  if (_has(action, `payload.data.${apiTypes.API_RESPONSE_AUTH_TOKEN}`)) {
    _set(action, `payload.data.${apiTypes.API_RESPONSE_AUTH_TOKEN}`, 'XXXX');
  }

  return action;
};

/**
 * Basic sanitize action, add functionality by dropping in a function.
 * @param action {Object}
 * @returns {Object}
 */
const sanitizeAction = action => {
  let updatedAction = { ...action };

  if (action.type && action.payload) {
    const parseUrl = val =>
      /^http/.test(val)
        ? `/${val
            .split('/')
            .slice(3)
            .join('/')}`
        : val;

    const payloadUrl = _get(updatedAction, 'payload.url');

    if (payloadUrl) {
      _set(updatedAction, 'payload.url', parseUrl(payloadUrl));
    }

    const payloadConfigUrl = _get(updatedAction, 'payload.config.url');

    if (payloadConfigUrl) {
      _set(updatedAction, 'payload.config.url', parseUrl(payloadConfigUrl));
    }

    updatedAction = sanitizeAuthHeader(updatedAction);
    updatedAction = sanitizerPassword(updatedAction);
    updatedAction = sanitizeToken(updatedAction);

    return updatedAction;
  }

  return updatedAction;
};

/**
 * Return session stored log.
 * @param id {String}
 * @param limit {Number}
 * @returns {Array}
 */
const getActions = (id, limit) => {
  const item = window.sessionStorage.getItem(id);
  let parsedItems = item ? JSON.parse(item) : null;

  if (parsedItems && parsedItems.length && limit > 0) {
    parsedItems = parsedItems.slice(limit * -1);
  }

  return parsedItems;
};

/**
 * Store actions against an id in sessionStorage.
 * @param id {String}
 * @param limit {Number}
 * @param action {Object}
 */
const recordAction = (id, limit, action) => {
  const items = getActions(id, limit) || [];
  const updatedAction = sanitizeAction(action);

  const priorItem = items[items.length - 1];
  const actionObj = {
    diff: 0,
    timestamp: Date.now(),
    action: updatedAction
  };

  if (priorItem && priorItem.timestamp) {
    actionObj.diff = actionObj.timestamp - priorItem.timestamp;
  }

  items.push(actionObj);

  window.sessionStorage.setItem(id, JSON.stringify(items));
};

/**
 * Expose settings and record middleware.
 * @param options {Object}
 * @returns {function(): function(*): function(*=): *}
 */
const actionRecordMiddleware = (options = {}) => {
  const settings = {
    id: options.id || 'actionRecordMiddleware/v1',
    limitResults: options.limitResults || 100
  };

  return () => next => action => {
    const result = next(action);
    recordAction(settings.id, settings.limitResults, action);
    return result;
  };
};

export { actionRecordMiddleware as default, actionRecordMiddleware };
