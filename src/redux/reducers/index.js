import { combineReducers } from 'redux';
import accountReducers from './accountReducers';
import accountWizardReducers from './accountWizardReducers';
import confirmationModalReducers from './confirmationModalReducers';
import toastNotificationsReducers from './toastNotificationsReducers';
import userReducers from './userReducers';

const reducers = {
  account: accountReducers,
  accountWizard: accountWizardReducers,
  confirmationModal: confirmationModalReducers,
  toastNotifications: toastNotificationsReducers,
  user: userReducers
};

const reduxReducers = combineReducers(reducers);

export {
  reduxReducers as default,
  reduxReducers,
  accountReducers,
  accountWizardReducers,
  confirmationModalReducers,
  toastNotificationsReducers,
  userReducers
};
