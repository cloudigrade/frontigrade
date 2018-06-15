import * as accountTypes from './accountConstants';
import * as confirmationModalTypes from './confirmationModalConstants';
import * as toastNotificationTypes from './toastNotificationConstants';
import * as userTypes from './userConstants';

const reduxTypes = {
  account: accountTypes,
  confirmationModal: confirmationModalTypes,
  toastNotifications: toastNotificationTypes,
  user: userTypes
};

export { reduxTypes as default, reduxTypes, accountTypes, confirmationModalTypes, toastNotificationTypes, userTypes };
