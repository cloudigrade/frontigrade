import { accountTypes, systemConfigTypes } from '../constants';
import helpers from '../../common/helpers';
import apiTypes from '../../constants/apiConstants';

const initialState = {
  add: false,
  account: {},
  configuration: {},
  edit: false,
  error: false,
  errorMessage: null,
  fulfilled: false,
  pending: false,
  show: false,
  stepPolicyValid: false,
  stepPolicyErrorMessage: null,
  stepRoleValid: true,
  stepArnValid: false,
  stepArnErrorMessage: null
};

const accountWizardReducers = (state = initialState, action) => {
  switch (action.type) {
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
          account: Object.assign({}, state.account, action.account),
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
          account: Object.assign({}, state.account, action.account),
          stepPolicyValid: false
        },
        {
          state,
          reset: false
        }
      );

    case accountTypes.ADD_ACCOUNT_WIZARD_STEP_ARN:
      return helpers.setStateProp(
        null,
        {
          account: Object.assign({}, state.account, action.account),
          stepArnValid: true
        },
        {
          state,
          reset: false
        }
      );

    case accountTypes.INVALID_ACCOUNT_WIZARD_STEP_ARN:
      return helpers.setStateProp(
        null,
        {
          account: Object.assign({}, state.account, action.account),
          stepArnValid: false
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

    case helpers.REJECTED_ACTION(accountTypes.ADD_ACCOUNT):
      const policyRejectedErrors = helpers.getErrorMessageFromResults(action.payload, apiTypes.API_ACCOUNT_NAME);
      const arnRejectedErrors = helpers.getErrorMessageFromResults(action.payload, apiTypes.API_ACCOUNT_ARN);

      return helpers.setStateProp(
        null,
        {
          error: action.error,
          errorMessage: helpers.getErrorMessageFromResults(action.payload),
          stepArnValid: arnRejectedErrors === '',
          stepArnErrorMessage: arnRejectedErrors,
          stepPolicyValid: policyRejectedErrors === '',
          stepPolicyErrorMessage: policyRejectedErrors,
          fulfilled: false,
          pending: false
        },
        {
          state,
          reset: false
        }
      );

    case helpers.PENDING_ACTION(accountTypes.ADD_ACCOUNT):
      return helpers.setStateProp(
        null,
        {
          error: false,
          errorMessage: null,
          fulfilled: false,
          pending: true
        },
        {
          state,
          reset: false
        }
      );

    case helpers.FULFILLED_ACTION(accountTypes.ADD_ACCOUNT):
      return helpers.setStateProp(
        null,
        {
          account: action.payload.data,
          error: false,
          errorMessage: null,
          fulfilled: true,
          pending: false
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
