import { userTypes } from '../constants';
import apiTypes from '../../constants/apiConstants';
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
    email: null,
    locale: null
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
          locale: state.session.locale,
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
          locale: state.session.locale,
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
      const checkName = (action.payload.data && action.payload.data[apiTypes.API_RESPONSE_AUTH_USERNAME]) || null;
      const checkEmail = (action.payload.data && action.payload.data[apiTypes.API_RESPONSE_AUTH_EMAIL]) || null;
      let checkAuth = false;

      if (checkName) {
        checkAuth = true;
      }

      return helpers.setStateProp(
        'session',
        {
          authorized: checkAuth,
          username: checkName,
          email: checkEmail
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(userTypes.USER_LOCALE):
      return helpers.setStateProp(
        'session',
        {
          locale: action.payload.data
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
          authorized: true,
          fulfilled: true,
          locale: state.session.locale,
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
          locale: state.session.locale,
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
          locale: state.session.locale,
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
          locale: state.session.locale,
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
