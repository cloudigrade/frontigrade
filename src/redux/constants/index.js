import * as accountTypes from './accountConstants';
import * as applicationStatusTypes from './applicationStatusConstants';
import * as confirmationModalTypes from './confirmationModalConstants';
import * as systemConfigTypes from './systemConfigConstants';
import * as toastNotificationTypes from './toastNotificationConstants';
import * as userTypes from './userConstants';

const reduxTypes = {
  account: accountTypes,
  applicationStatus: applicationStatusTypes,
  confirmationModal: confirmationModalTypes,
  systemConfig: systemConfigTypes,
  toastNotifications: toastNotificationTypes,
  user: userTypes
};

export {
  reduxTypes as default,
  reduxTypes,
  accountTypes,
  applicationStatusTypes,
  confirmationModalTypes,
  systemConfigTypes,
  toastNotificationTypes,
  userTypes
};
