import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedAccountView, AccountView } from '../accountView';

describe('AccountView Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ account: {}, filter: { account: {} } });
    const component = shallow(<ConnectedAccountView />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component with empty state', () => {
    const props = {};

    const component = mount(<AccountView {...props} />);

    expect(component.find('button').length).toEqual(1);
    expect(component.render()).toMatchSnapshot('empty state');
  });

  it('should render a non-connected component with a list', () => {
    const props = {
      accounts: [{ id: 1, name: 'Lorem ipsum' }]
    };

    const component = mount(<AccountView {...props} />);

    expect(component.find('.cloudmeter-list-container').length).toEqual(1);
    expect(component.find('.cloudmeter-list-container').render()).toMatchSnapshot('list');
  });
});
