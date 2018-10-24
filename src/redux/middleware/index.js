import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import actionRecordMiddleware from './actionRecordMiddleware';
import statusMiddleware from './statusMiddleware';

const reduxMiddleware = [
  thunkMiddleware,
  statusMiddleware(),
  promiseMiddleware(),
  actionRecordMiddleware({ id: `${process.env.REACT_APP_UI_LOGGER_ID}` })
];

if (process.env.NODE_ENV !== 'production' && process.env.REACT_APP_DEBUG_MIDDLEWARE === 'true') {
  reduxMiddleware.push(createLogger());
}

export {
  reduxMiddleware as default,
  reduxMiddleware,
  createLogger,
  promiseMiddleware,
  statusMiddleware,
  thunkMiddleware
};
