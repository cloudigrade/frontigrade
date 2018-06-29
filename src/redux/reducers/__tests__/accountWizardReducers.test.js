import { accountWizardReducers } from '../';
import { accountTypes as types } from '../../constants';

describe('AccountWizardReducers', () => {
  it('should return the initial state', () => {
    expect(accountWizardReducers.initialState).toBeDefined();
  });

  it('should handle all defined types', () => {
    Object.keys(types).forEach(value => {
      const dispatched = {
        type: value,
        account: {
          test: 'success'
        }
      };

      const resultState = accountWizardReducers(undefined, dispatched);

      expect({ type: value, result: resultState }).toMatchSnapshot('fulfilled types');
    });
  });
});
