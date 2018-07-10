import { systemConfigReducers } from '../';
import { systemConfigTypes as types } from '../../constants';
import helpers from '../../../common/helpers';

describe('SystemConfigReducers', () => {
  it('should return the initial state', () => {
    expect(systemConfigReducers.initialState).toBeDefined();
  });

  it('should handle all defined error types', () => {
    Object.keys(types).forEach(value => {
      const dispatched = {
        type: helpers.REJECTED_ACTION(value),
        error: true,
        payload: {
          message: 'MESSAGE',
          response: {
            data: {
              detail: 'ERROR'
            }
          }
        }
      };

      const resultState = systemConfigReducers(undefined, dispatched);

      expect({ type: helpers.REJECTED_ACTION(value), result: resultState }).toMatchSnapshot('rejected types');
    });
  });

  it('should handle all defined pending types', () => {
    Object.keys(types).forEach(value => {
      const dispatched = {
        type: helpers.PENDING_ACTION(value)
      };

      const resultState = systemConfigReducers(undefined, dispatched);

      expect({ type: helpers.PENDING_ACTION(value), result: resultState }).toMatchSnapshot('pending types');
    });
  });

  it('should handle all defined fulfilled types', () => {
    Object.keys(types).forEach(value => {
      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            test: 'success'
          }
        }
      };

      const resultState = systemConfigReducers(undefined, dispatched);

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
