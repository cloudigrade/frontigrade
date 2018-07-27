import { accountTypes } from '../constants';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';

const initialState = {
  view: {
    accounts: [],
    error: false,
    errorStatus: null,
    errorMessage: null,
    pending: false,
    fulfilled: false,
    updateAccounts: false
  }
};

const accountReducers = (state = initialState, action) => {
  switch (action.type) {
    case accountTypes.UPDATE_ACCOUNTS:
      return helpers.setStateProp(
        'view',
        {
          updateAccounts: true
        },
        {
          state,
          reset: false
        }
      );

    case helpers.REJECTED_ACTION(accountTypes.GET_ACCOUNTS):
      return helpers.setStateProp(
        'view',
        {
          error: action.error,
          errorMessage: helpers.getMessageFromResults(action.payload),
          errorStatus: helpers.getStatusFromResults(action.payload)
        },
        {
          state,
          initialState
        }
      );

    case helpers.PENDING_ACTION(accountTypes.GET_ACCOUNTS):
      return helpers.setStateProp(
        'view',
        {
          accounts: state.view.accounts,
          pending: true
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNTS):
      return helpers.setStateProp(
        'view',
        {
          accounts: action.payload.data[apiTypes.API_RESPONSE_ACCOUNTS] || [],
          fulfilled: true,
          updateAccounts: false
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
