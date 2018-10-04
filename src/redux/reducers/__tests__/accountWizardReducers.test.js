import { accountWizardReducers } from '..';
import { accountTypes as types, systemConfigTypes } from '../../constants';
import helpers from '../../../common/helpers';

describe('AccountWizardReducers', () => {
  it('should return the initial state', () => {
    expect(accountWizardReducers.initialState).toBeDefined();
  });

  it('should handle specific defined types', () => {
    const specificTypes = [helpers.FULFILLED_ACTION(systemConfigTypes.GET_SYSTEM_CONFIG)];

    specificTypes.forEach(value => {
      const dispatched = {
        type: value,
        payload: {
          data: {
            detail: 'TEST'
          },
          message: 'MESSAGE',
          response: {
            data: {
              detail: 'ERROR'
            }
          }
        }
      };

      const resultState = accountWizardReducers(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot(`defined type ${value}`);
    });
  });

  it('should handle all defined types', () => {
    Object.keys(types).forEach(value => {
      const dispatched = {
        type: value,
        account: {
          test: 'success'
        }
      };

      const resultState = accountWizardReducers(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot('defined types');
    });
  });
});
