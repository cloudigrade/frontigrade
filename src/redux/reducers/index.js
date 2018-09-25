import { combineReducers } from 'redux';
import aboutModalReducers from './aboutModalReducers';
import accountReducers from './accountReducers';
import accountImagesReducers from './accountImagesReducers';
import accountEditReducers from './accountEditReducers';
import accountWizardReducers from './accountWizardReducers';
import confirmationModalReducers from './confirmationModalReducers';
import filterReducers from './filterReducers';
import systemConfigReducers from './systemConfigReducers';
import toastNotificationsReducers from './toastNotificationsReducers';
import userReducers from './userReducers';

const reducers = {
  aboutModal: aboutModalReducers,
  account: accountReducers,
  accountImages: accountImagesReducers,
  accountEdit: accountEditReducers,
  accountWizard: accountWizardReducers,
  confirmationModal: confirmationModalReducers,
  filter: filterReducers,
  systemConfig: systemConfigReducers,
  toastNotifications: toastNotificationsReducers,
  user: userReducers
};

const reduxReducers = combineReducers(reducers);

export {
  reduxReducers as default,
  reduxReducers,
  aboutModalReducers,
  accountReducers,
  accountImagesReducers,
  accountEditReducers,
  accountWizardReducers,
  confirmationModalReducers,
  filterReducers,
  systemConfigReducers,
  toastNotificationsReducers,
  userReducers
};
