import * as toastNotificationTypes from './toastNotificationConstants';
import * as userTypes from './userConstants';

const reduxTypes = {
  toastNotifications: toastNotificationTypes,
  user: userTypes
};

export { reduxTypes as default, reduxTypes, toastNotificationTypes, userTypes };
