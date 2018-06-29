import { combineReducers } from 'redux';
import accountReducers from './accountReducers';
import accountWizardReducers from './accountWizardReducers';
import confirmationModalReducers from './confirmationModalReducers';
import systemConfigReducers from './systemConfigReducers';
import toastNotificationsReducers from './toastNotificationsReducers';
import userReducers from './userReducers';

const reducers = {
  account: accountReducers,
  accountWizard: accountWizardReducers,
  confirmationModal: confirmationModalReducers,
  systemConfig: systemConfigReducers,
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
  systemConfigReducers,
  toastNotificationsReducers,
  userReducers
};
