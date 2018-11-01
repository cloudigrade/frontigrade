import { accountReducers } from '..';
import { accountTypes as types } from '../../constants';
import helpers from '../../../common/helpers';
import apiTypes from '../../../constants/apiConstants';

describe('AccountReducers', () => {
  it('should return the initial state', () => {
    expect(accountReducers.initialState).toBeDefined();
  });

  it('should handle specific defined types', () => {
    const specificTypes = [types.UPDATE_ACCOUNTS];

    specificTypes.forEach(value => {
      const dispatched = {
        type: value
      };

      const resultState = accountReducers(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot(`defined type ${value}`);
    });
  });

  it('should handle all defined error types', () => {
    const specificTypes = [types.GET_ACCOUNT, types.GET_ACCOUNTS];

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

      const resultState = accountReducers(undefined, dispatched);

      expect({ type: helpers.REJECTED_ACTION(value), result: resultState }).toMatchSnapshot('rejected types');
    });
  });

  it('should handle all defined pending types', () => {
    const specificTypes = [types.GET_ACCOUNT, types.GET_ACCOUNTS];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.PENDING_ACTION(value)
      };

      const resultState = accountReducers(undefined, dispatched);

      expect({ type: helpers.PENDING_ACTION(value), result: resultState }).toMatchSnapshot('pending types');
    });
  });

  it('should handle all defined fulfilled types', () => {
    const specificTypes = [types.GET_ACCOUNT, types.GET_ACCOUNTS];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            [apiTypes.API_RESPONSE_ACCOUNTS]: ['success']
          }
        }
      };

      const resultState = accountReducers(undefined, dispatched);

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
