import { combineReducers } from 'redux';
import toastNotificationsReducers from './toastNotificationsReducers';
import userReducers from './userReducers';

const reducers = {
  toastNotifications: toastNotificationsReducers,
  user: userReducers
};

const reduxReducers = combineReducers(reducers);

export { reduxReducers as default, reduxReducers, toastNotificationsReducers, userReducers };
