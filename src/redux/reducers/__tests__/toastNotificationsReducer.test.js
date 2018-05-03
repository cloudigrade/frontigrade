import toastNotificationsReducer from '../toastNotificationsReducer';
import { toastNotificationTypes } from '../../constants';

describe('toastNotificationsReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      toasts: [],
      paused: false,
      displayedToasts: 0
    };

    expect(toastNotificationsReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle adding and removing toast notifications', () => {
    let dispatched = {
      type: toastNotificationTypes.TOAST_ADD,
      header: 'Lorem',
      message: 'Lorem ipsum dolor',
      alertType: 'success'
    };

    let resultState = toastNotificationsReducer(undefined, dispatched);

    expect(resultState.toasts.length).toEqual(1);
    expect(Object.keys(resultState.toasts[0]).length).toEqual(4);

    dispatched = {
      type: toastNotificationTypes.TOAST_REMOVE,
      toast: resultState.toasts[0]
    };

    resultState = toastNotificationsReducer(undefined, dispatched);

    expect(resultState.toasts.length).toEqual(0);
  });

  it('should handle pausing and resuming a toast notification', () => {
    let dispatched = {
      type: toastNotificationTypes.TOAST_PAUSE
    };

    let resultState = toastNotificationsReducer(undefined, dispatched);

    expect(resultState.paused).toBeTruthy();

    dispatched = {
      type: toastNotificationTypes.TOAST_RESUME
    };

    resultState = toastNotificationsReducer(undefined, dispatched);

    expect(resultState.paused).toBeFalsy();
  });
});
