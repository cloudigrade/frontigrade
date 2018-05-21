import { userTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  session: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    authorized: false
  },
  user: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    current: {},
    other: {}
  }
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    // Error/Rejected
    case helpers.REJECTED_ACTION(userTypes.USER_CREATE):
    case helpers.REJECTED_ACTION(userTypes.USER_DELETE):
    case helpers.REJECTED_ACTION(userTypes.USER_INFO):
      return helpers.setStateProp(
        'user',
        {
          error: action.error,
          errorMessage: action.payload.message
        },
        {
          state,
          initialState
        }
      );

    case helpers.REJECTED_ACTION(userTypes.USER_LOGIN):
    case helpers.REJECTED_ACTION(userTypes.USER_LOGOUT):
      return helpers.setStateProp(
        'session',
        {
          error: action.error,
          errorMessage: action.payload.message
        },
        {
          state,
          initialState
        }
      );

    // Loading/Pending
    case helpers.PENDING_ACTION(userTypes.USER_CREATE):
    case helpers.PENDING_ACTION(userTypes.USER_DELETE):
    case helpers.PENDING_ACTION(userTypes.USER_INFO):
      return helpers.setStateProp(
        'user',
        {
          pending: true
        },
        {
          state,
          initialState
        }
      );

    case helpers.PENDING_ACTION(userTypes.USER_LOGIN):
    case helpers.PENDING_ACTION(userTypes.USER_LOGOUT):
      return helpers.setStateProp(
        'session',
        {
          pending: true
        },
        {
          state,
          initialState
        }
      );

    // Success/Fulfilled
    case helpers.FULFILLED_ACTION(userTypes.USER_CREATE):
      return helpers.setStateProp(
        'user',
        {
          fulfilled: true,
          other: action.payload.data
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(userTypes.USER_DELETE):
      return helpers.setStateProp(
        'user',
        {
          fulfilled: true,
          other: action.payload.data
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(userTypes.USER_LOGIN):
      return helpers.setStateProp(
        'session',
        {
          fulfilled: true,
          authorized: true
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(userTypes.USER_LOGOUT):
      return helpers.setStateProp(
        'session',
        {
          fulfilled: true,
          authorized: false
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(userTypes.USER_INFO):
      return helpers.setStateProp(
        'user',
        {
          fulfilled: true,
          current: action.payload.data
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

userReducers.initialState = initialState;

export { userReducers as default, initialState, userReducers };
