import { confirmationModalReducers } from '../';
import { confirmationModalTypes as types } from '../../constants';

describe('ConfirmationModalReducers', () => {
  it('should return the initial state', () => {
    expect(confirmationModalReducers.initialState).toBeDefined();
  });

  it('should handle all defined types', () => {
    Object.keys(types).forEach(value => {
      const dispatched = {
        type: value
      };

      const resultState = confirmationModalReducers(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot('defined types');
    });
  });
});
