import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { ConnectedAccountWizardStepPolicy } from '../accountWizardStepPolicy';

describe('AccountWizardStepPolicy Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a wizard policy step', () => {
    const store = generateEmptyStore({ accountWizard: {} });
    const component = shallow(<ConnectedAccountWizardStepPolicy />, { context: { store } });

    expect(component.dive()).toMatchSnapshot('connected');
  });
});
