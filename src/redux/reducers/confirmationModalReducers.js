import { confirmationModalTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  show: false
};

const confirmationModalReducers = (state = initialState, action) => {
  switch (action.type) {
    case confirmationModalTypes.CONFIRMATION_MODAL_SHOW:
      return helpers.setStateProp(
        null,
        {
          show: true,
          ...action
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
