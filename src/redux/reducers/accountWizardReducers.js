import { accountTypes, systemConfigTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  show: false,
  add: false,
  edit: false,
  error: false,
  errorMessage: null,
  account: {},
  configuration: {},
  stepPolicyValid: false,
  stepRoleValid: true,
  stepThreeValid: false,
  fulfilled: false
};

const accountWizardReducers = (state = initialState, action) => {
  switch (action.type) {
    // Show/Hide
    case accountTypes.ADD_ACCOUNT_SHOW:
      return helpers.setStateProp(
        null,
        {
          show: true,
          add: true
        },
        {
          state,
          initialState
        }
      );

    case accountTypes.UPDATE_ACCOUNT_HIDE:
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

    case accountTypes.ADD_ACCOUNT_WIZARD_STEP_POLICY:
      return helpers.setStateProp(
        null,
        {
          account: action.account,
          stepPolicyValid: true
        },
        {
          state,
          reset: false
        }
      );

    case accountTypes.INVALID_ACCOUNT_WIZARD_STEP_POLICY:
      return helpers.setStateProp(
        null,
        {
          account: action.account,
          stepPolicyValid: false
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(systemConfigTypes.GET_SYSTEM_CONFIG):
      return helpers.setStateProp(
        null,
        {
          configuration: action.payload.data
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

accountWizardReducers.initialState = initialState;

export { accountWizardReducers as default, initialState, accountWizardReducers };
