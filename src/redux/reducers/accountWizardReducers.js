import { accountTypes } from '../constants';
import helpers from '../../common/helpers';

const initialState = {
  show: false,
  add: false,
  edit: false,
  error: false,
  errorMessage: null,
  account: {},
  stepOneValid: false,
  stepTwoValid: false,
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

    case accountTypes.ADD_ACCOUNT_WIZARD_STEPONE:
      return helpers.setStateProp(
        null,
        {
          account: action.account,
          stepOneValid: true
        },
        {
          state,
          reset: false
        }
      );

    case accountTypes.INVALID_ACCOUNT_WIZARD_STEPONE:
      return helpers.setStateProp(
        null,
        {
          stepOneValid: false
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
