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
  account: {
    data: {},
    error: false,
    errorStatus: null,
    errorMessage: null,
    pending: false,
    fulfilled: false
  },
  view: {
    accounts: [],
    error: false,
    errorStatus: null,
    errorMessage: null,
    pending: false,
    fulfilled: false,
    updateAccounts: false
  },
  instances: {
    dailyUsage: [],
    instancesOpenshift: 0,
    instancesRhel: 0,
    error: false,
    errorStatus: null,
    errorMessage: null,
    pending: false,
    fulfilled: false
  }
};

const accountReducers = (state = initialState, action) => {
  switch (action.type) {
    case helpers.REJECTED_ACTION(accountTypes.GET_ACCOUNT):
      return helpers.setStateProp(
        'account',
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

    case helpers.PENDING_ACTION(accountTypes.GET_ACCOUNT):
      return helpers.setStateProp(
        'account',
        {
          pending: true
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNT):
      return helpers.setStateProp(
        'account',
        {
          data: action.payload.data || {},
          fulfilled: true
        },
        {
          state,
          initialState
        }
      );

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

    case helpers.REJECTED_ACTION(accountTypes.GET_ACCOUNT_INSTANCES):
      return helpers.setStateProp(
        'instances',
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

    case helpers.PENDING_ACTION(accountTypes.GET_ACCOUNT_INSTANCES):
      return helpers.setStateProp(
        'instances',
        {
          dailyUsage: state.instances.dailyUsage,
          pending: true
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNT_INSTANCES):
      return helpers.setStateProp(
        'instances',
        {
          dailyUsage: action.payload.data[apiTypes.API_RESPONSE_INSTANCES_USAGE] || [],
          instancesOpenshift: action.payload.data[apiTypes.API_RESPONSE_INSTANCES_OPENSHIFT] || 0,
          instancesRhel: action.payload.data[apiTypes.API_RESPONSE_INSTANCES_RHEL] || 0,
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
