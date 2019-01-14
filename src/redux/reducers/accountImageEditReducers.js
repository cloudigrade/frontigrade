import { accountTypes } from '../constants';
import helpers from '../../common/helpers';

/**
 * State for accountImageEditReducers contains generated image details in the form of:
 *
 * [imageId] : {
 *   error: false,
 *   errorStatus: null,
 *   errorMessage: null,
 *   fulfilled: false,
 *   image: {},
 *   pending: false
 * }
 */
const initialState = {};

const accountImagesEditReducers = (state = initialState, action) => {
  if (!action.meta || !action.meta.id) {
    return state;
  }

  switch (action.type) {
    case helpers.REJECTED_ACTION(accountTypes.GET_ACCOUNT_IMAGE):
      return helpers.setStateProp(
        null,
        {
          [action.meta.id]: {
            error: action.error,
            errorMessage: helpers.getMessageFromResults(action.payload),
            errorStatus: helpers.getStatusFromResults(action.payload)
          }
        },
        {
          state,
          reset: false
        }
      );

    case helpers.PENDING_ACTION(accountTypes.GET_ACCOUNT_IMAGE):
      return helpers.setStateProp(
        null,
        {
          [action.meta.id]: {
            pending: true
          }
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNT_IMAGE):
      return helpers.setStateProp(
        null,
        {
          [action.meta.id]: {
            error: false,
            errorMessage: null,
            errorStatus: null,
            fulfilled: true,
            image: action.payload.data || {},
            pending: false
          }
        },
        {
          state,
          reset: false
        }
      );

    case helpers.REJECTED_ACTION(accountTypes.UPDATE_ACCOUNT_IMAGE_FIELD_RHOCP):
      return helpers.setStateProp(
        null,
        {
          [action.meta.id]: {
            rhocpError: true,
            image: (state[action.meta.id] && state[action.meta.id].image) || {}
          }
        },
        {
          state,
          reset: false
        }
      );

    case helpers.PENDING_ACTION(accountTypes.UPDATE_ACCOUNT_IMAGE_FIELD_RHOCP):
      return helpers.setStateProp(
        null,
        {
          [action.meta.id]: {
            rhocpPending: true,
            image: (state[action.meta.id] && state[action.meta.id].image) || {}
          }
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.UPDATE_ACCOUNT_IMAGE_FIELD_RHOCP):
      return helpers.setStateProp(
        null,
        {
          [action.meta.id]: {
            rhocpError: false,
            rhocpFulfilled: true,
            rhocpPending: false,
            image: action.payload.data || {}
          }
        },
        {
          state,
          reset: false
        }
      );

    case helpers.REJECTED_ACTION(accountTypes.UPDATE_ACCOUNT_IMAGE_FIELD_RHEL):
      return helpers.setStateProp(
        null,
        {
          [action.meta.id]: {
            rhelError: true,
            image: (state[action.meta.id] && state[action.meta.id].image) || {}
          }
        },
        {
          state,
          reset: false
        }
      );

    case helpers.PENDING_ACTION(accountTypes.UPDATE_ACCOUNT_IMAGE_FIELD_RHEL):
      return helpers.setStateProp(
        null,
        {
          [action.meta.id]: {
            rhelPending: true,
            image: (state[action.meta.id] && state[action.meta.id].image) || {}
          }
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.UPDATE_ACCOUNT_IMAGE_FIELD_RHEL):
      return helpers.setStateProp(
        null,
        {
          [action.meta.id]: {
            rhelError: false,
            rhelFulfilled: true,
            rhelPending: false,
            image: action.payload.data || {}
          }
        },
        {
          state,
          reset: false
        }
      );

    default:
      return state;
  }
};

accountImagesEditReducers.initialState = initialState;

export { accountImagesEditReducers as default, initialState, accountImagesEditReducers };
