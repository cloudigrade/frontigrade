import {
  reduxTypes,
  aboutModalTypes,
  accountTypes,
  applicationStatusTypes,
  confirmationModalTypes,
  filterTypes,
  reportTypes,
  systemConfigTypes,
  toastNotificationTypes,
  userTypes
} from '..';

describe('ReduxTypes', () => {
  it('should export the same number of name-spaced types as imported', () => {
    expect(Object.keys(reduxTypes)).toHaveLength(9);
  });

  it('should return types that are defined', () => {
    Object.keys(reduxTypes).forEach(type => expect(reduxTypes[type]).toBeDefined());
  });

  it('should return types that match', () => {
    expect(reduxTypes.aboutModal).toEqual(aboutModalTypes);
    expect(reduxTypes.account).toEqual(accountTypes);
    expect(reduxTypes.applicationStatus).toEqual(applicationStatusTypes);
    expect(reduxTypes.confirmationModal).toEqual(confirmationModalTypes);
    expect(reduxTypes.filter).toEqual(filterTypes);
    expect(reduxTypes.report).toEqual(reportTypes);
    expect(reduxTypes.systemConfig).toEqual(systemConfigTypes);
    expect(reduxTypes.toastNotifications).toEqual(toastNotificationTypes);
    expect(reduxTypes.user).toEqual(userTypes);
  });
});
