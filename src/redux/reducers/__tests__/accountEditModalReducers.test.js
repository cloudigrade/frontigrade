import { accountEditModalReducers } from '..';
import { accountTypes as types } from '../../constants';
import helpers from '../../../common/helpers';

describe('AccountImagesReducers', () => {
  it('should return the initial state', () => {
    expect(accountEditModalReducers.initialState).toBeDefined();
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

      const resultState = accountEditModalReducers(undefined, dispatched);

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

      const resultState = accountEditModalReducers(undefined, dispatched);

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

      const resultState = accountEditModalReducers(undefined, dispatched);

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
