import { accountEditReducers } from '..';
import { accountTypes as types } from '../../constants';
import helpers from '../../../common/helpers';

describe('AccountEditReducers', () => {
  it('should return the initial state', () => {
    expect(accountEditReducers.initialState).toBeDefined();
  });

  it('should handle specific defined types', () => {
    const specificTypes = [
      types.DELETE_ACCOUNT_HIDE,
      types.DELETE_ACCOUNT_SHOW,
      types.EDIT_ACCOUNT_HIDE,
      types.EDIT_ACCOUNT_SHOW
    ];

    specificTypes.forEach(value => {
      const dispatched = {
        type: value
      };

      const resultState = accountEditReducers(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot(`defined type ${value}`);
    });
  });

  it('should handle all defined error types', () => {
    Object.keys(types).forEach(value => {
      if (/wizard/i.test(value)) {
        return;
      }

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

      const resultState = accountEditReducers(undefined, dispatched);

      expect({ type: helpers.REJECTED_ACTION(value), result: resultState }).toMatchSnapshot('rejected types');
    });
  });

  it('should handle all defined pending types', () => {
    Object.keys(types).forEach(value => {
      if (/wizard/i.test(value)) {
        return;
      }

      const dispatched = {
        type: helpers.PENDING_ACTION(value)
      };

      const resultState = accountEditReducers(undefined, dispatched);

      expect({ type: helpers.PENDING_ACTION(value), result: resultState }).toMatchSnapshot('pending types');
    });
  });

  it('should handle all defined fulfilled types', () => {
    Object.keys(types).forEach(value => {
      if (/wizard/i.test(value)) {
        return;
      }

      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            lorem: 'success'
          }
        }
      };

      const resultState = accountEditReducers(undefined, dispatched);

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
