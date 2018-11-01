import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedAccountGraphCard, AccountGraphCard } from '../accountGraphCard';

describe('AccountGraphCard Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ accountGraph: {} });
    const props = {
      filter: { query: {} },
      filterId: 1,
      view: 'test'
    };
    const component = shallow(<ConnectedAccountGraphCard {...props} />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component', () => {
    const props = {
      filter: { query: {} },
      filterId: null
    };

    const component = mount(<AccountGraphCard {...props} />);

    expect(component.render()).toMatchSnapshot('non-connected');
  });

  it('should render multiple states', () => {
    const props = {
      filter: { query: {} },
      filterId: 1
    };

    const component = shallow(<AccountGraphCard {...props} />);

    component.setProps({
      error: true
    });

    expect(component).toMatchSnapshot('error');

    component.setProps({
      error: false,
      pending: true
    });

    expect(component).toMatchSnapshot('pending');

    component.setProps({
      error: false,
      pending: false,
      fulfilled: true
    });

    expect(component).toMatchSnapshot('fulfilled');
  });
});
