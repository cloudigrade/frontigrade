import { accountTypes } from '../constants';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';

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
    images: [],
    error: false,
    errorStatus: null,
    errorMessage: null,
    pending: false,
    fulfilled: false
  }
};

const accountImagesReducers = (state = initialState, action) => {
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

    case helpers.REJECTED_ACTION(accountTypes.GET_ACCOUNT_IMAGES):
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

    case helpers.PENDING_ACTION(accountTypes.GET_ACCOUNT_IMAGES):
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

    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNT_IMAGES):
      return helpers.setStateProp(
        'view',
        {
          fulfilled: true,
          images: action.payload.data[apiTypes.API_RESPONSE_IMAGES] || []
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

accountImagesReducers.initialState = initialState;

export { accountImagesReducers as default, initialState, accountImagesReducers };
