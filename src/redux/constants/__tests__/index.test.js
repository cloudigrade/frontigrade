import reduxTypes from '..';
import * as toastNotificationTypes from '../toastNotificationConstants';

describe('reduxTypes', () => {
  it('should export the same number of name-spaced types as imported', () => {
    expect(Object.keys(reduxTypes)).toHaveLength(1);
  });

  it('should return types that are defined', () => {
    Object.keys(reduxTypes).forEach(type => expect(reduxTypes[type]).toBeDefined());
  });

  it('should return types that match', () => {
    expect(reduxTypes.toastNotifications).toEqual(toastNotificationTypes);
  });
});
