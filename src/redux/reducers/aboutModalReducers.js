import { aboutModalTypes, systemConfigTypes } from '../constants';
import helpers from '../../common/helpers';
import apiTypes from '../../constants/apiConstants';

const initialState = {
  show: false,
  apiVersion: null
};

const aboutModalReducers = (state = initialState, action) => {
  switch (action.type) {
    case aboutModalTypes.ABOUT_MODAL_SHOW:
      return helpers.setStateProp(
        null,
        {
          show: true,
          ...action
        },
        {
          state,
          reset: false
        }
      );

    case aboutModalTypes.ABOUT_MODAL_HIDE:
      return helpers.setStateProp(
        null,
        {
          show: false
        },
        {
          state,
          initialState
        }
      );

    case helpers.FULFILLED_ACTION(systemConfigTypes.GET_SYSTEM_CONFIG):
      const configuration = action.payload.data;

      return helpers.setStateProp(
        null,
        {
          apiVersion: (configuration && configuration[apiTypes.API_RESPONSE_SYS_CONFIG_VERSION]) || null
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

aboutModalReducers.initialState = initialState;

export { aboutModalReducers as default, initialState, aboutModalReducers };
