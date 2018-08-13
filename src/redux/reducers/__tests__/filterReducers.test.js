import { filterReducers } from '..';
import { filterTypes as types, accountTypes } from '../../constants';
import apiTypes from '../../../constants/apiConstants';
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
       * API currently has no default values, we set these "date" defaults in state as temp-fix.
       * This condition should be removed. It removes part of the snapshot that contains a recent
       * date.
       */
      if (resultState.account && resultState.account.query) {
        delete resultState.account.query;
        delete resultState.accountGlobal.query;
        delete resultState.accountImages.query;
      }

      expect({ type: value, result: resultState }).toMatchSnapshot('defined types');
    });
  });

  it('should handle specific account fulfilled types', () => {
    const specificTypes = [accountTypes.GET_ACCOUNTS, accountTypes.GET_ACCOUNT_IMAGES];

    specificTypes.forEach(value => {
      if (/wizard/i.test(value)) {
        return;
      }

      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            [apiTypes.API_RESPONSE_ACCOUNTS]: [{ name: 'lorem' }, { name: 'ipsum' }],
            [apiTypes.API_RESPONSE_IMAGES]: [{ name: 'ipsum' }, { name: 'dolor' }]
          }
        }
      };

      const resultState = filterReducers(undefined, dispatched);

      /**
       * ToDo: API-no-default-list
       * API currently has no default values, we set these "date" defaults in state as temp-fix.
       * This condition should be removed. It removes part of the snapshot that contains a recent
       * date.
       */
      if (resultState.account && resultState.account.query) {
        delete resultState.account.query;
        delete resultState.accountGlobal.query;
        delete resultState.accountImages.query;
      }

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
