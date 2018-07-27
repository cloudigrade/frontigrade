import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedAccountViewEditModal, AccountEditModal } from '../accountEditModal';

describe('AccountEditModal Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ accountEditModal: { show: true, account: {} } });
    const component = shallow(<ConnectedAccountViewEditModal />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component', () => {
    const props = {
      show: true,
      account: {}
    };

    const component = mount(<AccountEditModal {...props} />);
    expect(component.render()).toMatchSnapshot();
  });

  it('should have specific display states defined', () => {
    const props = {
      show: true,
      account: {}
    };

    const component = mount(<AccountEditModal {...props} />);

    component.setProps({
      pending: true
    });
    expect(component.render()).toMatchSnapshot('display pending state');

    component.setProps({
      pending: false,
      error: true
    });
    expect(component.render()).toMatchSnapshot('display error state');
  });

  it('should have specific events defined', () => {
    const props = {
      show: true,
      account: {}
    };
    const component = mount(<AccountEditModal {...props} />);
    const componentInstance = component.instance();

    expect(componentInstance.onCancel).toBeDefined();
    expect(componentInstance.onChangeAccountName).toBeDefined();
    expect(componentInstance.onSubmit).toBeDefined();

    component.find('input[name="accountName"]').simulate('change', { target: { value: '' } });
    expect(componentInstance.state).toMatchSnapshot('expected form error');

    component.find('input[name="accountName"]').simulate('change', { target: { value: 'lorem ipsum' } });
    expect(componentInstance.state).toMatchSnapshot('expected form valid');
  });
});
