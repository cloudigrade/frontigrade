import { accountTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  del: {
    account: {},
    error: false,
    errorMessage: null,
    errorStatus: null,
    pending: false,
    fulfilled: false,
    show: false
  },
  modal: {
    account: {},
    error: false,
    errorMessage: null,
    errorStatus: null,
    pending: false,
    fulfilled: false,
    show: false
  }
};

const accountEditReducers = (state = initialState, action) => {
  switch (action.type) {
    case accountTypes.DELETE_ACCOUNT_SHOW:
      return helpers.setStateProp(
        'del',
        {
          account: action.account,
          show: true
        },
        {
          state,
          initialState
        }
      );

    case accountTypes.DELETE_ACCOUNT_HIDE:
      return helpers.setStateProp(
        'del',
        {
          show: false
        },
        {
          state,
          initialState
        }
      );

    case accountTypes.EDIT_ACCOUNT_SHOW:
      return helpers.setStateProp(
        'modal',
        {
          account: action.account,
          show: true
        },
        {
          state,
          initialState
        }
      );

    case accountTypes.EDIT_ACCOUNT_HIDE:
      return helpers.setStateProp(
        'modal',
        {
          show: false
        },
        {
          state,
          initialState
        }
      );

    case helpers.REJECTED_ACTION(accountTypes.DELETE_ACCOUNT):
      return helpers.setStateProp(
        'del',
        {
          error: action.error,
          errorMessage: helpers.getMessageFromResults(action.payload),
          errorStatus: helpers.getStatusFromResults(action.payload),
          fulfilled: false,
          pending: false
        },
        {
          state,
          reset: false
        }
      );

    case helpers.PENDING_ACTION(accountTypes.DELETE_ACCOUNT):
      return helpers.setStateProp(
        'del',
        {
          error: false,
          errorMessage: null,
          errorStatus: null,
          fulfilled: false,
          pending: true
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.DELETE_ACCOUNT):
      return helpers.setStateProp(
        'del',
        {
          fulfilled: true
        },
        {
          state,
          initialState
        }
      );

    case helpers.REJECTED_ACTION(accountTypes.UPDATE_ACCOUNT):
    case helpers.REJECTED_ACTION(accountTypes.UPDATE_ACCOUNT_FIELD):
      return helpers.setStateProp(
        'modal',
        {
          error: action.error,
          errorMessage: helpers.getMessageFromResults(action.payload),
          errorStatus: helpers.getStatusFromResults(action.payload),
          fulfilled: false,
          pending: false
        },
        {
          state,
          reset: false
        }
      );

    case helpers.PENDING_ACTION(accountTypes.UPDATE_ACCOUNT):
    case helpers.PENDING_ACTION(accountTypes.UPDATE_ACCOUNT_FIELD):
      return helpers.setStateProp(
        'modal',
        {
          error: false,
          errorMessage: null,
          errorStatus: null,
          fulfilled: false,
          pending: true
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.UPDATE_ACCOUNT):
    case helpers.FULFILLED_ACTION(accountTypes.UPDATE_ACCOUNT_FIELD):
      return helpers.setStateProp(
        'modal',
        {
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

accountEditReducers.initialState = initialState;

export { accountEditReducers as default, initialState, accountEditReducers };
