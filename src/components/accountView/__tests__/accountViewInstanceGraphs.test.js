import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import { ConnectedAccountViewInstanceGraphs, AccountViewInstanceGraphs } from '../accountViewInstanceGraphs';

describe('AccountImagesViewInstanceGraphs Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ account: { instances: {} } });
    const props = {
      filter: { query: {} }
    };
    const component = shallow(<ConnectedAccountViewInstanceGraphs {...props} />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component', () => {
    const props = {
      filter: { query: {} }
    };

    const component = mount(<AccountViewInstanceGraphs {...props} />);

    expect(component.render()).toMatchSnapshot('non-connected');
  });

  it('should render a multiple states', () => {
    const props = {
      filter: { query: {} }
    };

    const component = shallow(<AccountViewInstanceGraphs {...props} />);

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
