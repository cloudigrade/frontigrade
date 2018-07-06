import React from 'react';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { ConnectedAccountWizardStepArn } from '../accountWizardStepArn';

describe('AccountWizardStepArn Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a wizard ARN step', () => {
    const store = generateEmptyStore({ accountWizard: { show: true } });
    const component = shallow(<ConnectedAccountWizardStepArn />, { context: { store } });

    expect(component.dive()).toMatchSnapshot('connected');
  });
});
