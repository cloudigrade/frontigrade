import { systemConfigTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  error: false,
  errorMessage: '',
  pending: false,
  fulfilled: false,
  configuration: {}
};

const systemConfigReducers = (state = initialState, action) => {
  switch (action.type) {
    // Error/Rejected
    case helpers.REJECTED_ACTION(systemConfigTypes.GET_SYSTEM_CONFIG):
      return helpers.setStateProp(
        null,
        {
          error: action.error,
          errorMessage: action.payload
        },
        {
          state,
          initialState
        }
      );

    // Loading/Pending
    case helpers.PENDING_ACTION(systemConfigTypes.GET_SYSTEM_CONFIG):
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

    // Success/Fulfilled
    case helpers.FULFILLED_ACTION(systemConfigTypes.GET_SYSTEM_CONFIG):
      return helpers.setStateProp(
        null,
        {
          configuration: action.payload.data,
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

systemConfigReducers.initialState = initialState;

export { systemConfigReducers as default, initialState, systemConfigReducers };
