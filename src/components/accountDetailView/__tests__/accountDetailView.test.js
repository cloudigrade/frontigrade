import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedAccountDetailView, AccountDetailView } from '../accountDetailView';

describe('AccountView Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component', () => {
    const store = generateEmptyStore({ account: {} });
    const component = shallow(<ConnectedAccountDetailView />, { context: { store } });

    expect(component.dive()).toMatchSnapshot('connected');
  });

  it('should render a non-connected component', () => {
    const props = {};

    const component = mount(<AccountDetailView {...props} />);
    expect(component.render()).toMatchSnapshot();

    expect(component.find('button').length).toEqual(1);
  });
});
