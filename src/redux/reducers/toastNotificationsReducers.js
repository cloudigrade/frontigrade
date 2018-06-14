import { toastNotificationTypes } from '../constants';

const initialState = {
  toasts: [],
  paused: false,
  displayedToasts: 0
};

const toastNotificationsReducers = (state = initialState, action) => {
  switch (action.type) {
    case toastNotificationTypes.TOAST_ADD:
      const newToast = {
        header: action.header,
        message: action.message,
        alertType: action.alertType,
        persistent: action.persistent
      };

      return Object.assign({}, state, {
        toasts: [...state.toasts, newToast],
        displayedToasts: state.displayedToasts + 1
      });

    case toastNotificationTypes.TOAST_REMOVE:
      const displayedToast = state.toasts.find(toast => !toast.removed);
      let updatedToasts = [];

      if (displayedToast) {
        updatedToasts = [...state.toasts];
        updatedToasts[state.toasts.indexOf(action.toast)].removed = true;
      }

      return Object.assign({}, state, {
        toasts: updatedToasts
      });

    case toastNotificationTypes.TOAST_PAUSE:
      return Object.assign({}, state, { paused: true });

    case toastNotificationTypes.TOAST_RESUME:
      return Object.assign({}, state, { paused: false });

    default:
      return state;
  }
};

toastNotificationsReducers.initialState = initialState;

export { toastNotificationsReducers as default, initialState, toastNotificationsReducers };
