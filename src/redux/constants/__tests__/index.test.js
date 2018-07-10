import {
  reduxTypes,
  accountTypes,
  applicationStatusTypes,
  confirmationModalTypes,
  systemConfigTypes,
  toastNotificationTypes,
  userTypes
} from '..';

describe('ReduxTypes', () => {
  it('should export the same number of name-spaced types as imported', () => {
    expect(Object.keys(reduxTypes)).toHaveLength(6);
  });

  it('should return types that are defined', () => {
    Object.keys(reduxTypes).forEach(type => expect(reduxTypes[type]).toBeDefined());
  });

  it('should return types that match', () => {
    expect(reduxTypes.account).toEqual(accountTypes);
    expect(reduxTypes.applicationStatus).toEqual(applicationStatusTypes);
    expect(reduxTypes.confirmationModal).toEqual(confirmationModalTypes);
    expect(reduxTypes.systemConfig).toEqual(systemConfigTypes);
    expect(reduxTypes.toastNotifications).toEqual(toastNotificationTypes);
    expect(reduxTypes.user).toEqual(userTypes);
  });
});
