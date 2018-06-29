import { accountTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  view: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    accounts: []
  }
};

const accountReducers = (state = initialState, action) => {
  switch (action.type) {
    // Error/Rejected
    case helpers.REJECTED_ACTION(accountTypes.GET_ACCOUNTS):
    case helpers.REJECTED_ACTION(accountTypes.GET_ACCOUNT):
      return helpers.setStateProp(
        'view',
        {
          error: action.error,
          errorMessage: action.payload
        },
        {
          state,
          initialState
        }
      );

    // Loading/Pending
    case helpers.PENDING_ACTION(accountTypes.GET_ACCOUNTS):
    case helpers.PENDING_ACTION(accountTypes.GET_ACCOUNT):
      return helpers.setStateProp(
        'view',
        {
          pending: true,
          accounts: state.view.accounts
        },
        {
          state,
          initialState
        }
      );

    // Success/Fulfilled
    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNTS):
    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNT):
      return helpers.setStateProp(
        'view',
        {
          accounts: action.payload.data,
          fulfilled: true
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

accountReducers.initialState = initialState;

export { accountReducers as default, initialState, accountReducers };
