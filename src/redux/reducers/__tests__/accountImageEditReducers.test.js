import { accountImageEditReducers } from '..';
import { accountTypes as types } from '../../constants';
import helpers from '../../../common/helpers';
import apiTypes from '../../../constants/apiConstants';

describe('AccountImageEditReducers', () => {
  it('should return the initial state', () => {
    expect(accountImageEditReducers.initialState).toBeDefined();
  });

  it('should handle all defined error types', () => {
    const specificTypes = [
      types.GET_ACCOUNT_IMAGE,
      types.UPDATE_ACCOUNT_IMAGE_FIELD_RHEL,
      types.UPDATE_ACCOUNT_IMAGE_FIELD_RHOCP
    ];

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

      const resultState = accountImageEditReducers(undefined, dispatched);

      expect({ type: helpers.REJECTED_ACTION(value), result: resultState }).toMatchSnapshot(`rejected types ${value}`);
    });
  });

  it('should handle all defined pending types', () => {
    const specificTypes = [
      types.GET_ACCOUNT_IMAGE,
      types.UPDATE_ACCOUNT_IMAGE_FIELD_RHEL,
      types.UPDATE_ACCOUNT_IMAGE_FIELD_RHOCP
    ];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.PENDING_ACTION(value)
      };

      const resultState = accountImageEditReducers(undefined, dispatched);

      expect({ type: helpers.PENDING_ACTION(value), result: resultState }).toMatchSnapshot(`pending types ${value}`);
    });
  });

  it('should handle all defined fulfilled types', () => {
    const specificTypes = [
      types.GET_ACCOUNT_IMAGE,
      types.UPDATE_ACCOUNT_IMAGE_FIELD_RHEL,
      types.UPDATE_ACCOUNT_IMAGE_FIELD_RHOCP
    ];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            [apiTypes.API_RESPONSE_IMAGES]: ['success']
          }
        }
      };

      const resultState = accountImageEditReducers(undefined, dispatched);

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot(
        `fulfilled types ${value}`
      );
    });
  });
});
