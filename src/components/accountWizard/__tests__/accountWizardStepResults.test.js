import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedAccountWizardStepResults, AccountWizardStepResults } from '../accountWizardStepResults';

describe('AccountWizardStepResults Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected wizard results step with error', () => {
    const store = generateEmptyStore({
      accountWizard: { show: true, account: {}, error: true, errorMessage: 'Lorem ipsum' }
    });
    const component = shallow(<ConnectedAccountWizardStepResults />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a wizard results step with error', () => {
    const props = {
      edit: false,
      error: true,
      errorMessage: 'lorem ipsum'
    };

    const component = mount(<AccountWizardStepResults {...props} />);
    expect(component).toMatchSnapshot('error');

    component.setProps({ edit: true });
    expect(component).toMatchSnapshot('error edit');
  });

  it('should render a wizard results step with pending', () => {
    const props = {
      accountName: 'test',
      edit: false,
      pending: true
    };

    const component = mount(<AccountWizardStepResults {...props} />);
    expect(component).toMatchSnapshot('pending');

    component.setProps({ edit: true });
    expect(component).toMatchSnapshot('pending edit');
  });

  it('should render a wizard results step with fulfilled', () => {
    const props = {
      accountName: 'test',
      edit: false,
      fulfilled: true
    };

    const component = mount(<AccountWizardStepResults {...props} />);
    expect(component).toMatchSnapshot('fulfilled');

    component.setProps({ edit: true });
    expect(component).toMatchSnapshot('fulfilled edit');
  });
});
