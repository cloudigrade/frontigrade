import { accountTypes } from '../constants';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';

const initialState = {
  instances: {
    account: {},
    dailyUsage: [],
    instancesOpenshift: 0,
    instancesRhel: 0,
    error: false,
    errorStatus: null,
    errorMessage: null,
    pending: false,
    fulfilled: false,
    updateInstances: false
  },
  view: {
    images: [],
    error: false,
    errorStatus: null,
    errorMessage: null,
    pending: false,
    fulfilled: false,
    updateImages: false
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

    case helpers.REJECTED_ACTION(accountTypes.GET_ACCOUNT_IMAGES_INSTANCES):
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

    case helpers.PENDING_ACTION(accountTypes.GET_ACCOUNT_IMAGES_INSTANCES):
      return helpers.setStateProp(
        'instances',
        {
          pending: true
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNT_IMAGES_INSTANCES):
      return helpers.setStateProp(
        'instances',
        {
          account: state.instances.account,
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

    case accountTypes.UPDATE_ACCOUNT_IMAGES_INSTANCES:
      return helpers.setStateProp(
        'instances',
        {
          updateInstances: true
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.UPDATE_ACCOUNT_IMAGE):
    case helpers.FULFILLED_ACTION(accountTypes.UPDATE_ACCOUNT_IMAGE_FIELD):
      const updatedImage = action.payload.data || {};
      const existingImageIndex = state.view.images.findIndex(image => updatedImage.id === image.id);
      const updatedImages = [...state.view.images];

      if (existingImageIndex > -1) {
        updatedImages[existingImageIndex] = Object.assign({ ...updatedImages[existingImageIndex] }, updatedImage);
      }

      return helpers.setStateProp(
        'view',
        {
          images: updatedImages,
          updateImages: true
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

accountImagesReducers.initialState = initialState;

export { accountImagesReducers as default, initialState, accountImagesReducers };
