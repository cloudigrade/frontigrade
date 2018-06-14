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
    username: null,
    email: null
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

    case helpers.PENDING_ACTION(userTypes.USER_LOGIN):
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
          authorized: true,
          username: (action.payload.data && action.payload.data.username) || null,
          email: (action.payload.data && action.payload.data.email) || null
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(userTypes.USER_LOGIN):
      return helpers.setStateProp(
        'session',
        {
          fulfilled: true,
          authorized: true,
          remember: state.session.remember,
          storedEmail: state.session.storedEmail
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
          authorized: false,
          remember: state.session.remember,
          storedEmail: state.session.storedEmail
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
