import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedAccountDeleteModal, AccountDeleteModal } from '../accountDeleteModal';

describe('AccountDeleteModal Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ accountEdit: { del: { show: true, account: {} } } });
    const component = shallow(<ConnectedAccountDeleteModal />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component', () => {
    const props = {
      show: true,
      account: {}
    };

    const component = mount(<AccountDeleteModal {...props} />);
    expect(component.render()).toMatchSnapshot();
  });
});
