import { accountTypes } from '../constants';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';

/**
 * Notes:
 * The updateAccounts prop is only used to trigger a refresh of the account summary API call.
 * This prop anticipates being reset through "helpers.setStateProp" when the API call is
 * rejected, pending, or fulfilled. If "updateAccounts" is not reset to false, and/or checks
 * within the accountView component are relaxed an infinite refresh loop could, potentially,
 * happen.
 */
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
