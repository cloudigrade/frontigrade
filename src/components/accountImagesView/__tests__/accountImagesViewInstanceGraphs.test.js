import React from 'react';
import configureMockStore from 'redux-mock-store';
import { mount, shallow } from 'enzyme';
import {
  ConnectedAccountImagesViewInstanceGraphs,
  AccountImagesViewInstanceGraphs
} from '../accountImagesViewInstanceGraphs';

describe('AccountImagesViewInstanceGraphs Component', () => {
  const generateEmptyStore = (obj = {}) => configureMockStore()(obj);

  it('should render a connected component with default props', () => {
    const store = generateEmptyStore({ accountImages: { instances: {} } });
    const props = {
      filter: { query: {} },
      filterId: 1
    };
    const component = shallow(<ConnectedAccountImagesViewInstanceGraphs {...props} />, { context: { store } });

    expect(component).toMatchSnapshot('connected');
  });

  it('should render a non-connected component', () => {
    const props = {
      filter: { query: {} },
      filterId: 1
    };

    const component = mount(<AccountImagesViewInstanceGraphs {...props} />);

    expect(component.render()).toMatchSnapshot('non-connected');
  });

  it('should render a multiple states', () => {
    const props = {
      filter: { query: {} },
      filterId: 1
    };

    const component = shallow(<AccountImagesViewInstanceGraphs {...props} />);

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
