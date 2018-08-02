import { accountTypes } from '../constants';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';

const initialState = {
  view: {
    account: {},
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
          images: state.view.images,
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
          account: state.view.account,
          images: action.payload.data[apiTypes.API_RESPONSE_IMAGES] || [],
          fulfilled: true
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNT):
      return helpers.setStateProp(
        'view',
        {
          account: action.payload.data || {},
          images: state.view.images,
          fulfilled: state.view.fulfilled
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
