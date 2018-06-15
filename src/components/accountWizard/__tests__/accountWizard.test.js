import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedAccountWizard, AccountWizard } from '../accountWizard';

describe('AccountView Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a wizard', () => {
    const store = generateEmptyStore({ accountWizard: { show: true } });
    const component = shallow(<ConnectedAccountWizard />, { context: { store } });

    expect(component.dive()).toMatchSnapshot('connected');
  });

  it('should not display a wizard', () => {
    const props = {
      show: false
    };

    const component = mount(<AccountWizard {...props} />);
    expect(component.render()).toMatchSnapshot();
  });

  it('should have specific events defined', () => {
    const props = {
      show: false
    };
    const component = mount(<AccountWizard {...props} />);
    const componentInstance = component.instance();

    expect(componentInstance.onCancel).toBeDefined();
    expect(componentInstance.onNext).toBeDefined();
    expect(componentInstance.onBack).toBeDefined();
    expect(componentInstance.onSubmit).toBeDefined();
    expect(componentInstance.onStep).toBeDefined();
  });
});
