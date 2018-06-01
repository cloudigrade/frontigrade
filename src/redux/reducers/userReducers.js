import { userTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  session: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    authorized: false,
    loginFailed: false,
    remember: false,
    storedEmail: null,
    userInfo: {}
  },
  user: {
    error: false,
    errorMessage: '',
    pending: false,
    fulfilled: false,
    userInfo: {}
  }
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    // Error/Rejected
    case helpers.REJECTED_ACTION(userTypes.USER_CREATE):
    case helpers.REJECTED_ACTION(userTypes.USER_DELETE):
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

    case helpers.REJECTED_ACTION(userTypes.USER_INFO):
    case helpers.REJECTED_ACTION(userTypes.USER_LOGOUT):
    case helpers.REJECTED_ACTION(userTypes.USER_STORED_DATA):
    case helpers.REJECTED_ACTION(userTypes.USER_STORED_DATA_REMOVE):
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

    case helpers.REJECTED_ACTION(userTypes.USER_LOGIN):
      return helpers.setStateProp(
        'session',
        {
          error: action.error,
          errorMessage: action.payload.message,
          loginFailed: true
        },
        {
          state,
          initialState
        }
      );

    // Loading/Pending
    case helpers.PENDING_ACTION(userTypes.USER_CREATE):
    case helpers.PENDING_ACTION(userTypes.USER_DELETE):
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

    case helpers.PENDING_ACTION(userTypes.USER_INFO):
    case helpers.PENDING_ACTION(userTypes.USER_LOGIN):
    case helpers.PENDING_ACTION(userTypes.USER_LOGOUT):
    case helpers.PENDING_ACTION(userTypes.USER_STORED_DATA):
    case helpers.PENDING_ACTION(userTypes.USER_STORED_DATA_REMOVE):
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
          userInfo: action.payload.data
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
          userInfo: action.payload.data
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(userTypes.USER_INFO):
      return helpers.setStateProp(
        'session',
        {
          fulfilled: true,
          authorized: true,
          userInfo: action.payload.data
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

    case helpers.FULFILLED_ACTION(userTypes.USER_STORED_DATA):
      return helpers.setStateProp(
        'session',
        {
          fulfilled: true,
          remember: true,
          storedEmail: action.payload.email
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(userTypes.USER_STORED_DATA_REMOVE):
      return helpers.setStateProp(
        'session',
        {
          fulfilled: true,
          remember: false,
          storedEmail: null
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
