import { accountWizardReducers } from '..';
import { accountTypes as types, systemConfigTypes } from '../../constants';
import helpers from '../../../common/helpers';

describe('AccountWizardReducers', () => {
  it('should return the initial state', () => {
    expect(accountWizardReducers.initialState).toBeDefined();
  });

  it('should handle specific defined types', () => {
    const specificTypes = [
      types.ADD_ACCOUNT_SHOW,
      types.UPDATE_ACCOUNT_HIDE,
      types.ADD_ACCOUNT_WIZARD_STEP_POLICY,
      types.INVALID_ACCOUNT_WIZARD_STEP_POLICY,
      types.ADD_ACCOUNT_WIZARD_STEP_ARN,
      types.INVALID_ACCOUNT_WIZARD_STEP_ARN
    ];

    specificTypes.forEach(value => {
      const dispatched = {
        type: value
      };

      const resultState = accountWizardReducers(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot(`defined type ${value}`);
    });
  });

  it('should handle all defined error types', () => {
    const specificTypes = [types.ADD_ACCOUNT, systemConfigTypes.GET_SYSTEM_CONFIG];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.REJECTED_ACTION(value),
        error: true,
        payload: {
          message: 'MESSAGE',
          response: {
            status: 0,
            statusText: 'ERROR TEST',
            data: {
              detail: 'ERROR'
            }
          }
        }
      };

      const resultState = accountWizardReducers(undefined, dispatched);

      expect({ type: helpers.REJECTED_ACTION(value), result: resultState }).toMatchSnapshot('rejected types');
    });
  });

  it('should handle all defined pending types', () => {
    const specificTypes = [types.ADD_ACCOUNT, systemConfigTypes.GET_SYSTEM_CONFIG];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.PENDING_ACTION(value)
      };

      const resultState = accountWizardReducers(undefined, dispatched);

      expect({ type: helpers.PENDING_ACTION(value), result: resultState }).toMatchSnapshot('pending types');
    });
  });

  it('should handle all defined fulfilled types', () => {
    const specificTypes = [types.ADD_ACCOUNT, systemConfigTypes.GET_SYSTEM_CONFIG];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            lorem: 'success'
          }
        }
      };

      const resultState = accountWizardReducers(undefined, dispatched);

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
