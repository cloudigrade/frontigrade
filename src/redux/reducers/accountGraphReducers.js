import { accountTypes } from '../constants';
import apiTypes from '../../constants/apiConstants';
import helpers from '../../common/helpers';

const initialState = {
  graphData: {
    dailyUsage: [],
    totalInstancesOpenshift: 0,
    totalInstancesRhel: 0
  },
  error: false,
  errorStatus: null,
  errorMessage: null,
  pending: false,
  fulfilled: false,
  updateInstances: false
};

const accountGraphReducers = (state = initialState, action) => {
  switch (action.type) {
    case helpers.REJECTED_ACTION(accountTypes.GET_ACCOUNT_IMAGES_INSTANCES):
    case helpers.REJECTED_ACTION(accountTypes.GET_ACCOUNT_INSTANCES):
      return helpers.setStateProp(
        null,
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
    case helpers.PENDING_ACTION(accountTypes.GET_ACCOUNT_INSTANCES):
      return helpers.setStateProp(
        null,
        {
          pending: true
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNT_IMAGES_INSTANCES):
    case helpers.FULFILLED_ACTION(accountTypes.GET_ACCOUNT_INSTANCES):
      return helpers.setStateProp(
        null,
        {
          graphData: {
            dailyUsage: action.payload.data[apiTypes.API_RESPONSE_INSTANCES_USAGE] || [],
            totalInstancesOpenshift: action.payload.data[apiTypes.API_RESPONSE_INSTANCES_OPENSHIFT] || 0,
            totalInstancesRhel: action.payload.data[apiTypes.API_RESPONSE_INSTANCES_RHEL] || 0
          },
          fulfilled: true
        },
        {
          state,
          initialState
        }
      );

    case accountTypes.UPDATE_ACCOUNT_IMAGES_INSTANCES:
      return helpers.setStateProp(
        null,
        {
          updateInstances: true
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

accountGraphReducers.initialState = initialState;

export { accountGraphReducers as default, initialState, accountGraphReducers };
