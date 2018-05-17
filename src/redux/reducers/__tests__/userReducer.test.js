import { userReducers } from '../';
import { userTypes as types } from '../../constants';
import helpers from '../../../common/helpers';

describe('UserReducers', () => {
  it('should return the initial state', () => {
    expect(userReducers.initialState).toBeDefined();
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

      const resultState = userReducers(undefined, dispatched);

      expect(resultState).toMatchSnapshot();
    });
  });

  it('should handle all defined pending types', () => {
    Object.keys(types).forEach(value => {
      const dispatched = {
        type: helpers.PENDING_ACTION(value)
      };

      const resultState = userReducers(undefined, dispatched);

      expect(resultState).toMatchSnapshot();
    });
  });
});
