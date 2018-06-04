import { confirmationModalTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  show: false,
  title: 'Confirm',
  heading: null,
  icon: null,
  body: null,
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
  onConfirm: null,
  onCancel: null
};

const confirmationModalReducers = (state = initialState, action) => {
  switch (action.type) {
    case confirmationModalTypes.CONFIRMATION_MODAL_SHOW:
      return helpers.setStateProp(
        null,
        {
          show: true,
          title: action.title,
          heading: action.heading,
          icon: action.icon,
          body: action.body,
          confirmButtonText: action.confirmButtonText,
          cancelButtonText: action.cancelButtonText,
          onConfirm: action.onConfirm,
          onCancel: action.onCancel
        },
        {
          state,
          initialState
        }
      );

    case confirmationModalTypes.CONFIRMATION_MODAL_HIDE:
      return helpers.setStateProp(
        null,
        {
          show: false
        },
        {
          state,
          initialState
        }
      );

    default:
      return state;
  }
};

confirmationModalReducers.initialState = initialState;

export { confirmationModalReducers as default, initialState, confirmationModalReducers };
