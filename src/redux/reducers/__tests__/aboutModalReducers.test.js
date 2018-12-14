import { aboutModalReducers } from '..';
import { aboutModalTypes as types, systemConfigTypes } from '../../constants';
import helpers from '../../../common/helpers';

describe('ConfirmationModalReducers', () => {
  it('should return the initial state', () => {
    expect(aboutModalReducers.initialState).toBeDefined();
  });

  it('should handle all defined types', () => {
    Object.keys(types).forEach(value => {
      const dispatched = {
        type: value
      };

      const resultState = aboutModalReducers(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot('defined types');
    });
  });

  it('should handle all defined fulfilled types', () => {
    const specificTypes = [systemConfigTypes.GET_SYSTEM_CONFIG];

    specificTypes.forEach(value => {
      const dispatched = {
        type: helpers.FULFILLED_ACTION(value),
        payload: {
          data: {
            version: 'test'
          }
        }
      };

      const resultState = aboutModalReducers(undefined, dispatched);

      expect({ type: helpers.FULFILLED_ACTION(value), result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
