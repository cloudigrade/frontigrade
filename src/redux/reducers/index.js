import { combineReducers } from 'redux';
import accountReducers from './accountReducers';
import accountImagesReducers from './accountImagesReducers';
import accountEditModalReducers from './accountEditModalReducers';
import accountWizardReducers from './accountWizardReducers';
import confirmationModalReducers from './confirmationModalReducers';
import filterReducers from './filterReducers';
import systemConfigReducers from './systemConfigReducers';
import toastNotificationsReducers from './toastNotificationsReducers';
import userReducers from './userReducers';

const reducers = {
  account: accountReducers,
  accountImages: accountImagesReducers,
  accountEditModal: accountEditModalReducers,
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
  accountReducers,
  accountImagesReducers,
  accountEditModalReducers,
  accountWizardReducers,
  confirmationModalReducers,
  filterReducers,
  systemConfigReducers,
  toastNotificationsReducers,
  userReducers
};
