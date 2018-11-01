import { accountGraphReducers } from '..';
import { accountTypes as types } from '../../constants';
import helpers from '../../../common/helpers';

describe('AccountGraphReducers', () => {
  it('should return the initial state', () => {
    expect(accountGraphReducers.initialState).toBeDefined();
  });

  it('should handle specific defined types', () => {
    const specificTypes = [types.UPDATE_ACCOUNT_IMAGES_INSTANCES];

    specificTypes.forEach(value => {
      const dispatched = {
        type: value
      };

      const resultState = accountGraphReducers(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot(`defined type ${value}`);
    });
  });

  it('should handle all defined error types', () => {
    const specificTypes = [types.GET_ACCOUNT_IMAGES_INSTANCES, types.GET_ACCOUNT_INSTANCES];

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

      const resultState = accountGraphReducers(undefined, dispatched);

      expect({ type: helpers.REJECTED_ACTION(value), result: resultState }).toMatchSnapshot('rejected types');
    });
  });

  it('should handle all defined pending types', () => {
    const specificTypes = [types.GET_ACCOUNT_IMAGES_INSTANCES, types.GET_ACCOUNT_INSTANCES];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.PENDING_ACTION(value)
      };

      const resultState = accountGraphReducers(undefined, dispatched);

      expect({ type: helpers.PENDING_ACTION(value), result: resultState }).toMatchSnapshot('pending types');
    });
  });

  it('should handle all defined fulfilled types', () => {
    const specificTypes = [types.GET_ACCOUNT_IMAGES_INSTANCES, types.GET_ACCOUNT_INSTANCES];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            lorem: 'success'
          }
        }
      };

      const resultState = accountGraphReducers(undefined, dispatched);

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
