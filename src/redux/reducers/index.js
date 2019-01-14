import { combineReducers } from 'redux';
import aboutModalReducers from './aboutModalReducers';
import accountEditReducers from './accountEditReducers';
import accountGraphReducers from './accountGraphReducers';
import accountImageEditReducers from './accountImageEditReducers';
import accountImagesReducers from './accountImagesReducers';
import accountReducers from './accountReducers';
import accountWizardReducers from './accountWizardReducers';
import confirmationModalReducers from './confirmationModalReducers';
import filterReducers from './filterReducers';
import systemConfigReducers from './systemConfigReducers';
import toastNotificationsReducers from './toastNotificationsReducers';
import userReducers from './userReducers';

const reducers = {
  aboutModal: aboutModalReducers,
  account: accountReducers,
  accountEdit: accountEditReducers,
  accountGraph: accountGraphReducers,
  accountImageEdit: accountImageEditReducers,
  accountImages: accountImagesReducers,
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
  accountEditReducers,
  accountGraphReducers,
  accountImageEditReducers,
  accountImagesReducers,
  accountWizardReducers,
  confirmationModalReducers,
  filterReducers,
  systemConfigReducers,
  toastNotificationsReducers,
  userReducers
};
