import { combineReducers } from 'redux';
import toastNotificationsReducer from './toastNotificationsReducer';

const reducers = {
  toastNotifications: toastNotificationsReducer
};

const reduxReducers = combineReducers(reducers);

export { reduxReducers as default, reduxReducers, reducers };
