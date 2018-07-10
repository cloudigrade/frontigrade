import { toastNotificationsReducers } from '../';
import { toastNotificationTypes } from '../../constants';
import helpers from '../../../common/helpers';

describe('ToastNotificationsReducers', () => {
  it('should return the initial state', () => {
    expect(toastNotificationsReducers.initialState).toBeDefined();
  });

  it('should handle adding and removing toast notifications', () => {
    let dispatched = {
      type: toastNotificationTypes.TOAST_ADD,
      header: 'Lorem',
      message: 'Lorem ipsum dolor',
      alertType: 'success'
    };

    let resultState = toastNotificationsReducers(undefined, dispatched);
    resultState = toastNotificationsReducers(resultState, dispatched);

    expect(resultState.toasts.length).toEqual(2);
    expect(Object.keys(resultState.toasts[0]).length).toEqual(4);
    expect(Object.keys(resultState.toasts[1]).length).toEqual(4);

    dispatched = {
      type: toastNotificationTypes.TOAST_REMOVE,
      toast: resultState.toasts[0]
    };

    resultState = toastNotificationsReducers(resultState, dispatched);
    expect(resultState.toasts.filter(value => !value.removed).length).toEqual(1);
  });

  it('should handle pausing and resuming a toast notification', () => {
    let dispatched = {
      type: toastNotificationTypes.TOAST_PAUSE
    };

    let resultState = toastNotificationsReducers(undefined, dispatched);

    expect(resultState.paused).toBeTruthy();

    dispatched = {
      type: toastNotificationTypes.TOAST_RESUME
    };

    resultState = toastNotificationsReducers(undefined, dispatched);

    expect(resultState.paused).toBeFalsy();
  });

  it('should handle any httpStatus within the 5XX range', () => {
    let dispatched = {
      type: helpers.HTTP_STATUS_RANGE('5XX'),
      message: 'Network Error',
      status: undefined
    };

    let resultState = toastNotificationsReducers(undefined, dispatched);

    expect({ type: helpers.REJECTED_ACTION('TEST_TYPE'), result: resultState }).toMatchSnapshot('rejected type');

    dispatched = {
      type: helpers.HTTP_STATUS_RANGE('5XX'),
      error: true,
      message: 'Network Error',
      status: 503
    };

    resultState = toastNotificationsReducers(undefined, dispatched);

    expect({ type: helpers.REJECTED_ACTION('TEST_TYPE'), result: resultState }).toMatchSnapshot('503 rejected type');
  });
});
