import { filterReducers } from '../';
import { filterTypes as types, accountTypes } from '../../constants';
import helpers from '../../../common/helpers';

describe('FilterReducers', () => {
  it('should return the initial state', () => {
    expect(filterReducers.initialState).toBeDefined();
  });

  it('should handle all defined types', () => {
    Object.keys(types).forEach(value => {
      const dispatched = {
        type: value
      };

      const resultState = filterReducers(undefined, dispatched);

      /**
       * ToDo: API-no-default-list
       * API currently has no default values, we set these defaults in state as temp-fix.
       * This condition should be removed.
       */
      if (resultState.account && resultState.account.query) {
        delete resultState.account.query;
      }

      expect({ type: value, result: resultState }).toMatchSnapshot('defined types');
    });
  });

  it('should handle specific account fulfilled types', () => {
    const specificTypes = [accountTypes.GET_ACCOUNTS];

    specificTypes.forEach(value => {
      if (/wizard/i.test(value)) {
        return;
      }

      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            count: 1,
            results: ['success']
          }
        }
      };

      const resultState = filterReducers(undefined, dispatched);

      /**
       * ToDo: API-no-default-list
       * API currently has no default values, we set these defaults in state as temp-fix.
       * This condition should be removed.
       */
      if (resultState.account && resultState.account.query) {
        delete resultState.account.query;
      }

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
